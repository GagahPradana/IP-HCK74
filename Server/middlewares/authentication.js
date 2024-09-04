const { verifyToken } = require("../helpers/jwt");
const User = require("../models");

module.exports = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) throw { name: "invalidToken" };

    let [bearer, token] = access_token.split(" ");
    if (!bearer) throw { name: "invalidToken" };
    if (!token) throw { name: "invalidToken" };

    let { id } = verifyToken(token);
    let user = await User.findByPk(id);
    if (!user) throw { name: "invalidToken" };

    // req.user = {
    //   id: user.id,
    // };
    next();
  } catch (error) {
    next(error);
  }
};
