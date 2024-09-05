const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = class aiController {
  static async geminiAi(req, res, next) {
    try {
      const prompt = prompt;

      const result = await model.generateContent(prompt);
      res.send(result.response.text());
    } catch (err) {
      next(err);
    }
  }
};
