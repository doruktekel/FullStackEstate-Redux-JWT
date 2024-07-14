// const notFound = (req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

const errorMiddleware = (err, req, res, next) => {
  let statusCode = res.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === "developer" ? err.stack : null,
  });
};

export { errorMiddleware };
