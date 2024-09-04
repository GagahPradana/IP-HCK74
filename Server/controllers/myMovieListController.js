const { MyMovieList } = require("../models");

module.exports = class MyMovieListController {
  static async addList(req, res, next) {
    try {
      let addMovieList = { ...req.body };
      console.log(req.body, "...........");
      let movies = await MyMovieList.create(addMovieList);
      res.status(201).json(movies);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async updateList(req, res, next) {
    try {
      let { id } = req.params;
      let findMovie = await findMovie.findByPk(id);
      if (!findMovie) throw { name: "notFound" };

      let { movies } = req.body;
      let updateListMovie = await MyMovieList.update({
        ...movies,
        where: { id: id },
      });
      res.status(200).json(updateListMovie);
    } catch (error) {
      next(error);
    }
  }
  static async deleteList(req, res, next) {
    try {
      const { id } = req.params;
      let findMovie = await MyMovieList.findByPk(id);
      if (!findMovie) throw { name: "notFound" };

      await MyMovieList.destroy({
        where: { id: id },
      });
      res.status(200).json(findMovie);
    } catch (error) {
      next(error);
    }
  }
};
