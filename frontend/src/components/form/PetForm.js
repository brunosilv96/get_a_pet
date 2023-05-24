import { useState } from "react";

import formStyles from "../form/Form.module.css";

import Input from "./Input";
import Select from "./Select";

function PetForm({ handleSubmit, petData, btnText }) {
	const [pet, setPet] = useState(petData || {});
	const [preview, setPreview] = useState([]);
	const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

	function handleChange(e) {}
	function onFileChange(e) {}
	function handleColor(e) {}

	return (
		<form className={formStyles.form_container}>
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
				type="text"
				name="age"
				placeholder="Digite a idade"
				value={pet.age}
				handleOnChange={handleChange}
			/>
			<Input
				text="Peso do Pet"
				type="text"
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
