const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jsonwebtoken = require("jsonwebtoken");
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const AuthError = require("../exceptions/authErrors");

exports.register = async (req, res) => {
  const user = matchedData(req);
  user.password = await bcrypt.hash(user.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...user,
    },
  });

  const token = jsonwebtoken.sign(newUser, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ newUser, token });
};

exports.login = async (req, res, next) => {
  const loggedUser = matchedData(req);
  const user = await prisma.user.findUnique({
    where: {
      email: loggedUser.email,
    },
  });

  if (!user) {
    return next(new AuthError("Impossibile trovare l'utente"));
  }

  const matchedPassword = await bcrypt.compare(
    loggedUser.password,
    user.password
  );

  if (!matchedPassword) {
    return next(new AuthError("La password è errata"));
  }

  const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  delete user.password;

  res.json({ user, token });
};
