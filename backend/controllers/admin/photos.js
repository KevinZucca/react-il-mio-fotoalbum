const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

// get all the photos
exports.index = async (req, res) => {
  const { search, categories } = req.query;
  const photos = {};

  if (search) {
    photos.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  if (categories) {
    const categoriesFilter = categories
      .split(",")
      .map((category) => parseInt(category));

    photos.OR = [
      ...(photos.OR || []),
      { categories: { some: { id: { in: categoriesFilter } } } },
    ];
  }

  const data = await prisma.photo.findMany({
    where: photos,
    include: {
      categories: true,
      user: true,
    },
  });
  return res.json(data);
};

// get single photo from id
exports.show = async (req, res) => {
  const data = await prisma.photo.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      categories: true,
      user: true,
    },
  });
  return res.json(data);
};

// create a new photo
exports.create = async (req, res) => {
  const data = req.body;
  data.slug = kebabCase(data.title);

  const newPhoto = await prisma.photo.create({
    data: {
      title: data.title,
      slug: data.slug,
      src: data.src,
      description: data.description,
      visible: data.visible,
      userId: data.userId,
      categories: {
        connect: data.categories.map((category) => ({ id: category })),
      },
    },
    include: {
      categories: true,
      user: true,
    },
  });
  res.json(newPhoto);
};

// edit a photo
exports.update = async (req, res) => {
  const data = req.body;
  data.slug = kebabCase(data.title);

  const updatePhoto = await prisma.photo.update({
    data: {
      title: data.title,
      slug: data.slug,
      src: data.src,
      description: data.description,
      visible: data.visible,
      userId: Number(data.userId),
      categories: {
        set: data.categories.map((categoryId) => ({ id: categoryId })),
      },
    },
    where: {
      id: req.params.id,
    },
    include: {
      categories: true,
      user: true,
    },
  });
  res.json(updatePhoto);
};

// delete a photo
exports.destroy = async (req, res) => {
  await prisma.photo.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json("photo deleted");
};
