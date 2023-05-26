import { useState } from "react";

import formStyles from "../form/Form.module.css";

import Input from "./Input";
import Select from "./Select";

function PetForm({ handleSubmit, petData, btnText }) {
	const [pet, setPet] = useState(petData || {});
	const [preview, setPreview] = useState([]);
	const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

	function handleChange(e) {
		setPet({ ...pet, [e.target.name]: e.target.value });
	}
	function onFileChange(e) {
		setPreview(Array.from(e.target.files));
		setPet({ ...pet, images: [...e.target.files] });
	}
	function handleColor(e) {
		setPet({
			...pet,
			color: e.target.options[e.target.selectedIndex].text,
		});
	}

	const submit = (e) => {
		e.preventDefault();
		handleSubmit(pet);
	};

	return (
		<form onSubmit={submit} className={formStyles.form_container}>
			<div className={formStyles.preview_pet_images}>
				{preview.length > 0
					? preview.map((image, index) => (
							<img
								src={URL.createObjectURL(image)}
								alt={pet.name}
								key={`${pet.name}+${index}`}
							/>
					  ))
					: pet.images &&
					  pet.images.map((image, index) => (
							<img
								src={`${process.env.REACT_APP_API}/images/pets/${image}`}
								alt={pet.name}
								key={`${pet.name}+${index}`}
							/>
					  ))}
			</div>
			<Input
				text="Imagem do Pet"
				type="file"
				name="images"
				handleOnChange={onFileChange}
				multiple={true}
			/>
			<Input
				text="Nome do Pet"
				type="text"
				name="name"
				placeholder="Digite o nome"
				value={pet.name}
				handleOnChange={handleChange}
			/>
			<Input
				text="Idade do Pet"
				type="number"
				name="age"
				placeholder="Digite a idade"
				value={pet.age}
				handleOnChange={handleChange}
			/>
			<Input
				text="Peso do Pet"
				type="number"
				name="weight"
				placeholder="Digite o peso"
				value={pet.weight}
				handleOnChange={handleChange}
			/>
			<Select
				name="color"
				text="Selecione a Cor"
				options={colors}
				handleOnChange={handleColor}
				value={pet.color || ""}
			/>
			<input type="submit" value={btnText} />
		</form>
	);
}

export default PetForm;
