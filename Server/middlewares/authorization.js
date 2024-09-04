const { Movie } = require("../models");
let authorization = async (req, res, next) => {
  try {
    let { id } = req.params;
    let userId = req.user.id;
  } catch (error) {
    next(error);
  }
};
