const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

// get all the photos
exports.index = async (req, res) => {
  const data = await prisma.photo.findMany({
    where: {
      userId: req.user.id,
    },
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
      userId: req.user.id,
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
  console.log(data.categories);
  const updatePhoto = await prisma.photo.update({
    data: {
      title: data.title,
      slug: data.slug,
      src: data.src,
      description: data.description,
      visible: data.visible,
      userId: req.user.id,
      categories: {
        set: data.categories.map((category) => ({ id: category })),
      },
    },
    where: {
      id: Number(req.params.id),
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

// create a new photo
// exports.carica = async (req, res) => {
//   const data = req.body;
//   data.slug = kebabCase(data.title);
//   const filePath = req.file.path;
//   console.log(filePath);

//   const newPhoto = await prisma.photo.create({
//     data: {
//       title: data.title,
//       slug: data.slug,
//       src: req.file.src,
//       description: data.description,
//       visible: Boolean(data.visible),
//       userId: Number(req.user.id),
//       categories: {
//         connect: data.categories.map((category) => ({ id: Number(category) })),
//       },
//     },
//     include: {
//       categories: true,
//       user: true,
//     },
//   });
//   res.json(newPhoto);
//   console.log(req.file);
// };
