const router = require("express").Router();
const myMovieRoutes = require("./myMovieList");
const userController = require("../controllers/userController");

router.use("/my-movies", myMovieRoutes);
router.post("/login", userController.login);
router.post("/register", userController.register);
module.exports = router;
