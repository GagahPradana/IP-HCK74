const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();

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
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const user = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        default: {
          username: payload.name,
          email: payload.email,
          password: "Gagah",
        },
        hooks: false,
      });
      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
};
