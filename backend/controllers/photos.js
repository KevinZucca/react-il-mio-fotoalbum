const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

// get all the photos
exports.index = async (req, res) => {
  const data = await prisma.photo.findMany({
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
      // tags: {
      //   connect: data.tags.map((tag) => ({ id: tag })),
      // },
    },
    // include: {
    //   tags: true,
    //   image: true,
    // },
  });
  res.json(newPhoto);
};

// edit a photo
exports.update = async (req, res) => {
  const data = req.body;
  const updatePhoto = await prisma.photo.update({
    data: {
      title: data.title,
      slug: data.slug,
      src: data.src,
      description: data.description,
      visible: data.visible,
      userId: data.categoryId,
      // tags: {
      //   connect: data.tags.map((tagId) => ({ id: tagId })),
      // },
    },
    where: {
      id: req.params.id,
    },
    // include: {
    //   category: true,
    //   tags: true,
    //   user: true,
    // },
  });
  res.json(updatePhoto);
};

// delete a photo
exports.destroy = async (req, res) => {
  await prisma.photo.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json("photo deleted");
};
