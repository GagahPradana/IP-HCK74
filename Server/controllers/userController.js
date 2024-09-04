const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");

module.exports = class userController {
  static async register(req, res, next) {
    let { username, email, password } = req.body;
    try {
      let user = await User.create({
        username,
        email,
        password: hashPassword(password),
      });
      res.status(201).json({ id: user.id, id: email.id, user: username.id });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email) throw { name: "invalidUser" };
      if (!password) throw { name: "invalidUser" };

      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "notFound" };
      }
      let isCorrectPassword = comparePassword(password, user.password);
      if (!isCorrectPassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }
      let access_token = signToken({
        id: user.id,
      });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
};
