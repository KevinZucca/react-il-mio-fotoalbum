const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

// get all the categories
exports.index = async (req, res) => {
  const data = await prisma.category.findMany({
    include: {
      photos: true,
    },
  });
  return res.json(data);
};

// get single category from id
exports.show = async (req, res) => {
  const data = await prisma.category.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      photos: true,
    },
  });
  return res.json(data);
};
