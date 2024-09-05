const router = require("express").Router();
const myMovieRoutes = require("./myMovieList");
const userController = require("../controllers/userController");
const aiController = require("../controllers/aiController");

router.post("/gemini", aiController);
router.use("/my-movies", myMovieRoutes);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/google-login", userController.googleLogin);
module.exports = router;
