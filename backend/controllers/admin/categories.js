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

// create a new category
exports.create = async (req, res) => {
  const data = req.body;
  data.slug = kebabCase(data.name);

  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
    },
    include: {
      photos: true,
    },
  });
  res.json(newCategory);
};

// edit a category
exports.update = async (req, res) => {
  const data = req.body;
  data.slug = kebabCase(data.name);
  const updateCategory = await prisma.category.update({
    data: {
      name: data.name,
      slug: data.slug,
    },
    where: {
      id: Number(req.params.id),
    },
    include: {
      photos: true,
    },
  });
  res.json(updateCategory);
};

// delete a category
exports.destroy = async (req, res) => {
  await prisma.category.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json("category deleted");
};
