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
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: "Username must have at least 2 characters",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Email not valid",
    },
    notEmpty: {
      errorMessage: "You must enter the email address",
    },
  },
  custom: {
    options: async (value) => {
      const alreadyExists = await Prisma.user.findUnique({
        where: {
          email: value,
        },
      });
      if (alreadyExists) {
        return Promise.reject("Email entered already used!");
      }

      return true;
    },
  },
  password: {
    in: ["body"],
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
    },
    errorMessage:
      "The password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    notEmpty: {
      errorMessage: "You must enter a password.",
    },
  },
};
