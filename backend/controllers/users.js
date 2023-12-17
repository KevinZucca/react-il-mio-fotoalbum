const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all the users
exports.index = async (req, res) => {
  const data = await prisma.user.findMany({});
  return res.json(data);
};
