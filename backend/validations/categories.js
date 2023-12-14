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
  name: {
    isString: {
      errorMessage: "The name must be a string",
    },
    isLength: {
      errorMessage: "The name must have minimum 5 characters",
      options: { min: 5 },
    },
  },
};

module.exports = { paramID, bodyControl };
