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
import Profile from "./components/pages/User/Profile";
import MyPets from "./components/pages/Pet/MyPets";
import AddPet from "./components/pages/Pet/AddPet";
import EditPet from "./components/pages/Pet/EditPet";
import PetDetails from "./components/pages/Pet/PetDetails";
import MyAdoptions from "./components/pages/Pet/MyAdoptions";

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
						<Route path="/user/profile" element={<Profile />} />
						<Route path="/pet/mypets" element={<MyPets />} />
						<Route path="/pet/add" element={<AddPet />} />
						<Route
							path="/pet/myadoptions"
							element={<MyAdoptions />}
						/>
						<Route path="/pet/edit/:id" element={<EditPet />} />
						<Route path="/pet/:id" element={<PetDetails />} />
					</Routes>
				</Container>
				<Footer />
			</UserProvider>
		</Router>
	);
}

export default App;
