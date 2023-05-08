import { createContext } from "react"; // Importa o mecanismo de conexto da biblioteca

import useAuth from "../hooks/useAuth"; // Importa o hock com as funcionalidades

const Context = createContext(); // Aciona a função de criação do contexo importado do React

/*
	A função abaixo faz a criação do contexto e tudo que ele precisa prover para a aplicação
	É utilizado o 'children' para que o provedor entenda onde precisa receber ou informar os dados
*/
function UserProvider({ children }) {
	// Feito o desmembramento do hoock, pegando apenas a função 'register'
	const { authenticated, register, logout, login } = useAuth();

	/*
		Quando a função 'UserProvider' é acionada, ela retorna o componente abaixo
		Em 'value' são fornecidas as funcionalidades que poderão ser acessadas por qualquer elemento
		que o provedor 'abraçar', basicamente qualquer outro componente do projeto poderá acessar as
		funções disponivéis aqui 
	*/
	return <Context.Provider value={{ authenticated, register, logout, login }}>{children}</Context.Provider>;
}

// É exportado o contexto criado aqui junto com o provedor
export { Context, UserProvider };

/*
	-UserProvider: Gera a possibilidade de acessar todos os métodos (funções) em determinados locais do projeto
	-Context: É a forma de acessar as funções que o 'UserProvider' referenciou
*/
