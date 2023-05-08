import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Import pages
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

// Import contexts
import { UserProvider } from "./context/UserContext";

function App() {
	return (
		<Router>
			{/* Todos os componentes envoltos por 'UserProvider' podem acessar as seuas funções */}
			<UserProvider>
				<Navbar />
				<Message />
				<Container>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</Container>
				<Footer />
			</UserProvider>
		</Router>
	);
}

export default App;
