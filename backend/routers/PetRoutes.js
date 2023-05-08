const router = require("express").Router();

const PetController = require("../controllers/PetController");

// Middleweres
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

// Public routes
router.get("/", PetController.getAll);
router.get("/:id", PetController.getPetById);

// Private routes
router.post("/create", verifyToken, imageUpload.array("images"), PetController.create);
router.get("/mypets", verifyToken, PetController.myPets);
router.get("/myadoptions", verifyToken, PetController.myAdoptions);
router.delete("/remove/:id", verifyToken, PetController.deletePetById);
router.patch("/edit/:id", verifyToken, imageUpload.array("images"), PetController.updatePet);
router.patch("/schedule/:id", verifyToken, PetController.schedule);
router.patch("/conclude/:id", verifyToken, PetController.concludeAdoption);

module.exports = router;
