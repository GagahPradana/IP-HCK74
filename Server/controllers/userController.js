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
      console.log("Received headers:", req.headers);
      const { google_token } = req.headers;
      console.log("Google token:", google_token);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log("Ticket verified");

      const payload = ticket.getPayload();
      console.log("Payload:", payload);

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "Gagah",
        },
        hooks: false,
      });
      console.log("User found/created:", user.toJSON(), "Created:", created);

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      console.error("Google login error:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
};
