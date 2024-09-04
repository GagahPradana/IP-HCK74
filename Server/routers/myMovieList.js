const router = require("express").Router();
const MyMovieListController = require("../controllers/myMovieListController");

router.post("/", MyMovieListController.addList);
router.put("/:id", MyMovieListController.updateList);
router.delete("/:id", MyMovieListController.deleteList);

module.exports = router;
