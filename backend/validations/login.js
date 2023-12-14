/**
 * @type {import("express-validator").Schema}
 */
module.exports = {
  username: {
    in: ["body"],
    notEmpty: {
      options: {
        ignore_whitespace: true,
      },
      errorMessage: "You must enter the username",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email not valid",
    },
    notEmpty: {
      errorMessage: "Enter the email",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "You must enter the password",
    },
  },
};
