module.exports = (error, req, res, next) => {
  switch (error.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      return res.status(400).json({ message: err.errors[0].message });
    case "notFound":
      res.status(404).json({ message: "Error not found" });
    case "invalidToken" || error.name === "JsonWebTokenError":
      res.status(401).json({ message: "Unauthenticated" });
    case "Forbidden":
      res.status(403).json({ message: "Forbidden" });
    case "Unauthorized":
      return res.status(401).json({ message: err.message });
    default:
      return res.status(500).json({ message: "internal server error" });
  }
};
