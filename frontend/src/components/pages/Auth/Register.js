import { useState, useContext } from "react";
import Input from "../../form/Input";

import styles from "../../form/Form.module.css";
import { Link } from "react-router-dom";

// Contexts
import { Context } from "../../../context/UserContext";

function Register() {
	/*
		É uma forma de 'declarar' o estado das váriaveis em 'useState', assim é possivel pegar
		os valores destas variáveis em qualquer parte do projeto, como uma super variável 
	*/
	const [user, setUser] = useState({});

	/* 
		Resgato o método vinculado no meu contexto usando o hoock do React em conjunto com o 
		meu contexto criado, assim posso acessar a minha função através do contexto
	*/
	const { register } = useContext(Context);

	/*
		A função abaixo é executada no momento em que acontece uma mudança nos valores dos inputs
		Quando acionada, adiciona valores a variável global 'user' dentro de 'setState' do React
	*/
	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	/*
		A função abaixo é executada no momento em que acontece o envio do formulário
		onde o objeto 'user' já alimentado da função acima é vinculado a função de registro
	*/
	function handleSubmit(e) {
		e.preventDefault(); // Cancela o evento submit

		// Faz a chamada da função usando o contexto
		register(user);
	}

	return (
		<section className={styles.form_container}>
			<h1>Registrar</h1>
			<form onSubmit={handleSubmit}>
				<Input
					text="Nome"
					type="text"
					name="name"
					placeholder="Digite o seu nome"
					handleOnChange={handleChange}
				/>
				<Input
					text="E-mail"
					type="email"
					name="email"
					placeholder="Digite o seu email"
					handleOnChange={handleChange}
				/>
				<Input
					text="Telefone"
					type="text"
					name="phone"
					placeholder="Digite o seu telefone"
					handleOnChange={handleChange}
				/>
				<Input
					text="Senha"
					type="password"
					name="password"
					placeholder="Digite a sua senha"
					handleOnChange={handleChange}
				/>
				<Input
					text="Confirme a Senha"
					type="password"
					name="confirmpassword"
					placeholder="Confirme a sua senha"
					handleOnChange={handleChange}
				/>
				<input type="submit" value="Cadastrar" />
			</form>
			<p>
				Já tem conta? <Link to="/login">clique aqui!</Link>
			</p>
		</section>
	);
}

export default Register;
