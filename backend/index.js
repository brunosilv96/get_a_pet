const express = require("express");
const cors = require("cors");

// Start EXPRESS
const app = express();

// Resolve JSON
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Public folders from images
app.use(express.static("public"));

// Routes
const UserRoutes = require("./routers/UserRoutes");
const PetsRoutes = require("./routers/PetRoutes");

app.use("/users", UserRoutes);
app.use("/pets", PetsRoutes);

app.listen(5000);
