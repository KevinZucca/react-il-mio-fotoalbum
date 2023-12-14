const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

// get all the users
exports.index = async (req, res) => {
  const data = await prisma.user.findMany({
    include: {
      messages: true,
      photos: true,
    },
  });
  return res.json(data);
};

// get single user from id
exports.show = async (req, res) => {
  const data = await prisma.post.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  return res.json(data);
};

// create a new user
exports.create = async (req, res) => {
  const data = req.body;
  data.slug = kebabCase(data.title);

  const newUser = await prisma.user.create({
    data: {
      username: data.username,
      password: data.password,
      email: data.email,
    },
  });
  res.json(newUser);
};

// edit a user
exports.update = async (req, res) => {
  const data = req.body;
  const updateUser = await prisma.user.update({
    data: {
      username: data.username,
      password: data.password,
      email: data.email,
    },
    where: {
      id: req.params.id,
    },
  });
  res.json(updateUser);
};

// delete a user
exports.destroy = async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json("user deleted");
};
