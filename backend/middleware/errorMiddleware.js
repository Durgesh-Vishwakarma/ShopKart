const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  const responseBody = {
    success: false,
    message: err.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }), // Include stack trace only in development
  };

  // Log the error (use a logging library in production)
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error: ', responseBody);
  }

  res.json(responseBody);
};

export { notFound, errorHandler };
