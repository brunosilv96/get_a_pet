const Pet = require("../models/Pet");
const ObjectId = require("mongoose").Types.ObjectId;

// Helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class PetController {
	static async create(req, res) {
		const { name, age, weight, color } = req.body;

		const available = true;

		// Images upload
		const images = req.files;

		// Validations
		if (!name) {
			res.status(422).json({ message: "O nome é obrigatório!" });
			return;
		}
		if (!age) {
			res.status(422).json({ message: "A idade é obrigatória!" });
			return;
		}
		if (!weight) {
			res.status(422).json({ message: "O peso é obrigatório!" });
			return;
		}
		if (!color) {
			res.status(422).json({ message: "A cor é obrigatória!" });
			return;
		}
		if (images.length === 0) {
			res.status(422).json({ message: "A imagem é obrigatória!" });
			return;
		}

		// Search a owner
		const token = getToken(req);
		const user = await getUserByToken(token);

		// Create a pet
		const pet = new Pet({
			name,
			age,
			weight,
			color,
			available,
			images: [],
			user: {
				_id: user._id,
				name: user.name,
				image: user.image,
				phone: user.phone,
			},
		});

		images.map((image) => {
			pet.images.push(image.filename);
		});

		try {
			const newPet = await pet.save();
			res.status(201).json({
				message: "Pet cadastrado com sucesso!",
				newPet,
			});
		} catch (error) {
			res.status(500).json({ message: error });
		}
	}

	static async getAll(req, res) {
		const pets = await Pet.find().sort("-createdAt");

		res.status(200).json({ pets: pets });
	}

	static async myPets(req, res) {
		// Get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		// Pets from user
		const pets = await Pet.find({ "user._id": user._id }).sort(
			"-createdAt"
		);

		res.status(200).json({ pets });
	}

	static async myAdoptions(req, res) {
		// Get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		// Pets from user
		const pets = await Pet.find({ "adopter._id": user._id }).sort(
			"-createdAt"
		);

		res.status(200).json({ pets });
	}

	static async getPetById(req, res) {
		const id = req.params.id;

		if (!ObjectId.isValid(id)) {
			res.status(404).json({ message: "ID inválido!" });
			return;
		}

		// Find pet by ID
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado!" });
			return;
		}

		res.status(200).json({ pet: pet });
	}

	static async deletePetById(req, res) {
		const id = req.params.id;

		if (!ObjectId.isValid(id)) {
			res.status(404).json({ message: "Pet não encontrado!" });
			return;
		}

		// Find pet by ID
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado!" });
			return;
		}

		// Get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({
				message: "Usuário logado difere do usuário do PET",
			});
			return;
		}

		await Pet.findByIdAndRemove(id);

		res.status(200).json({
			message: "Pet excluido com sucesso!",
		});
	}

	static async updatePet(req, res) {
		const id = req.params.id;
		const { name, age, weight, color, available } = req.body;
		const updatedData = {};
		const images = req.files;

		if (!ObjectId.isValid(id)) {
			res.status(404).json({ message: "Pet não encontrado!" });
			return;
		}

		// Find pet by ID
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado!" });
			return;
		}

		// Get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({
				message: "Usuário logado difere do usuário do PET",
			});
			return;
		}

		// Validations
		if (!name) {
			res.status(422).json({ message: "O nome é obrigatório!" });
			return;
		} else {
			updatedData.name = name;
		}

		if (!age) {
			res.status(422).json({ message: "A idade é obrigatória!" });
			return;
		} else {
			updatedData.age = age;
		}

		if (!weight) {
			res.status(422).json({ message: "O peso é obrigatório!" });
			return;
		} else {
			updatedData.weight = weight;
		}

		if (!color) {
			res.status(422).json({ message: "A cor é obrigatória!" });
			return;
		} else {
			updatedData.color = color;
		}

		if (!available) {
			res.status(422).json({
				message: "Informar se o PET está disponivel é obrigatório!",
			});
			return;
		} else {
			updatedData.available = available;
		}

		if (images.length > 0) {
			updatedData.images = [];
			images.map((image) => {
				updatedData.images.push(image.filename);
			});
		}

		await Pet.findByIdAndUpdate(id, updatedData);

		res.status(200).json({ message: "Pet atualizado com sucesso!" });
	}

	static async schedule(req, res) {
		const id = req.params.id;

		// Check if pet existst
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado!" });
			return;
		}

		// Get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.equals(user._id)) {
			res.status(422).json({
				message: "Usuário logado é o dono do pet!",
			});
			return;
		}

		if (pet.adopter) {
			if (pet.adopter._id.toString() === user._id.toString()) {
				res.status(422).json({
					message: "Você já agendou uma visita para este pet!",
				});
				return;
			}
		}

		// Add user to pet
		pet.adopter = {
			_id: user._id,
			name: user.name,
			image: user.image,
		};

		await Pet.findByIdAndUpdate(id, pet);

		res.status(200).json({
			message: `Visita agendada com sucesso! Entre em contato com: ${pet.user.name}, telefone: ${pet.user.phone}`,
		});
	}

	static async concludeAdoption(req, res) {
		const id = req.params.id;

		// Check if pet existst
		const pet = await Pet.findOne({ _id: id });

		if (!pet) {
			res.status(404).json({ message: "Pet não encontrado!" });
			return;
		}

		// Get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({
				message: "Usuário logado não é o dono do pet!",
			});
			return;
		}

		pet.available = false;

		await Pet.findByIdAndUpdate(id, pet);

		res.status(200).json({
			message: `Parabéns! Ciclo de adoção do ${pet.name} concluido!`,
		});
	}
};
