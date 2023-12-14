/**
 * @type {import("express-validator").Schema}
 */
const paramID = {
  id: {
    in: ["params"],
    isInt: {
      errorMessage: "ID must be an integer number",
    },
  },
};

/**
 * @type {import("express-validator").Schema}
 */
const bodyControl = {
  title: {
    isString: {
      errorMessage: "Title must be a string",
    },
    isLength: {
      errorMessage: "Title must have minimum 5 characters",
      options: { min: 5 },
    },
  },
  // categories: {
  //   isLength: {
  //     errorMessage: "There must be at least 1 category",
  //     options: { min: 1 },
  //   },
  // },
};

module.exports = { paramID, bodyControl };
