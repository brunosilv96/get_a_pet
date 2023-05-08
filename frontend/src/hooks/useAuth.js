import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Faz o redirecionamento do usuário
import useFlashMessage from "./useFlashMessages";

export default function useAuth() {
	const { setFlashMessage } = useFlashMessage();
	const [authenticated, setAuthenticated] = useState(false);
	const history = useNavigate();

	/*
		Monitora o acionamento da função para que assim que seja executada configure a API com
		o token do usuário
	*/
	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			api.defaults.headers.Authorization = `Bearer ${token}`;
			setAuthenticated(true);
		}
	}, []);

	/* 
		A função abaixo vai fazer o envio do formulário de cadastro através da API para o backend 
	*/
	async function register(user) {
		let msgText = "Cadastro realizado com sucesso!";
		let msgType = "success";

		try {
			const data = await api.post("users/register", user).then((response) => {
				return response.data;
			});

			// Chama a função local de autenticação do usuário
			await authUser(data);
		} catch (error) {
			msgText = error.response.data.message;
			msgType = "error";
		}

		// Dispara as mensagens de erro ou sucesso para as flash messages
		setFlashMessage(msgText, msgType);
	}

	function logout() {
		const msgText = "Desconectado com sucesso!";
		const msgType = "success";

		setAuthenticated(false);
		localStorage.removeItem("token");
		api.defaults.headers.Authorization = undefined;
		history("/");

		setFlashMessage(msgText, msgType);
	}

	async function login(user) {
		let msgText = "Você está autenticado!";
		let msgType = "success";

		try {
			const data = await api.post("/users/login", user).then((response) => {
				return response.data;
			});

			await authUser(data);
		} catch (error) {
			msgText = error.response.data.message;
			msgType = "error";
		}

		setFlashMessage(msgText, msgType);
	}

	/*
		Função local que salva o token faz o redirecionamento para '/'
	*/
	async function authUser(data) {
		setAuthenticated(true); // Confirma a autenticação do usuário

		// Salva no storege local o token do usuário que é retornado da API
		localStorage.setItem("token", JSON.stringify(data.token));

		// Redireciona o usuário para '/' assim que finaliza as etapas acima
		history("/");
	}

	return { authenticated, register, logout, login };
}
