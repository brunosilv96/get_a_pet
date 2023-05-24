import api from "../../../utils/api";

import styles from "./AddPet.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Faz o redirecionamento do usuário

import PetForm from "../../form/PetForm";

// Hooks
import useFlashMessage from "../../../hooks/useFlashMessages";

function AddPet() {
	return (
		<selection className={styles.addpet_header}>
			<div>
				<h1>Cadastre um Pet</h1>
				<p>Depois ele ficará disponivel para adoção</p>
			</div>
			<PetForm />
		</selection>
	);
}

export default AddPet;
