const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all the photos
exports.index = async (req, res) => {
  const { search, visible, categories } = req.query;
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

  photos.visible = true;

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
