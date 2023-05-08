import { useState, useEffect } from "react";

import bus from "../../utils/bus";

import styles from "./Message.module.css";

function Message() {
	const [visibility, setVisibility] = useState(false); // Visibilidade é criada como false
	const [message, setMessage] = useState("");
	const [type, setType] = useState("");

	/*
		O 'useEffect' evita que a aplicação fique a todo momento renderizando este componete,
		tudo que for informado dentro dele só será executado quando houver alguma mudança, ou seja,
		toda vez que que a função 'Message' for chamada o 'useEffect' informa pro React que houve uma
		alteração, e o bloco dentro dele é executado
	 */
	useEffect(
		() => {
			/*
			O 'addListener' é nativo do DOM e basicamente cria um evento com o nome 'flash'.
			A função abaixo está esperando o tipo da mensagem e o texto dela, quando fornecido,
			alimenta as varáveis do 'useState' alem do 'setTimeout' para que se altere novamente
			após um tempo especifico
		*/
			bus.addListener("flash", ({ message, type }) => {
				setVisibility(true);
				setMessage(message);
				setType(type);

				setTimeout(() => {
					setVisibility(false);
				}, 3000);
			});
		},
		[] // O array vazio ao lado, evidencia o estado inicial do 'useEffect'
	);

	/*
		O 'Visibility' configura a visualização da mensagem, quando true mostra o texto e quando false
		ela desaparece da página
	*/
	return visibility && <div className={`${styles.message} ${styles[type]}`}>{message}</div>;
}

export default Message;
