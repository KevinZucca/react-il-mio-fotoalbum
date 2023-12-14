const AuthError = require("../exceptions/authErrors");
const jsonwebtoken = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    throw new AuthError("Bearer token mancante o malformato");
  }
  const token = bearer.split(" ")[1];
  const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  req["user"] = user;

  next();
};
