const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status: statusCode,
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
