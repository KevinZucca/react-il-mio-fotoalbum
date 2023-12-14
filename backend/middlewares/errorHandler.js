module.exports = function (err, req, res, next) {
  res.format({
    default: () => {
      const status = err.status || 500;
      res.status(status).json({
        message: "Si è verificato un errore",
        error: err.message,
        errorInstance: err.name,
      });
    },
  });
};
