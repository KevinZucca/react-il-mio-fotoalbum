const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

// get all the messages
exports.index = async (req, res) => {
  const data = await prisma.message.findMany({
    include: {
      user: true,
    },
  });
  return res.json(data);
};

// get single message from id
exports.show = async (req, res) => {
  const data = await prisma.message.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  return res.json(data);
};

// create a new message
exports.create = async (req, res) => {
  const data = req.body;
  data.slug = kebabCase(data.title);

  const newMessage = await prisma.message.create({
    data: {
      name: data.title,
      slug: data.slug,
    },
  });
  res.json(newMessage);
};

// edit a message
exports.update = async (req, res) => {
  const data = req.body;
  const updateMessage = await prisma.message.update({
    data: {
      name: data.title,
      slug: data.slug,
    },
    where: {
      id: req.params.id,
    },
  });
  res.json(updateMessage);
};

// delete a message
exports.destroy = async (req, res) => {
  await prisma.message.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json("message deleted");
};
