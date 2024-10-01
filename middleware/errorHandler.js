const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  // Set status code if not already set
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode); // Ensure response status is properly set
  
  let response = {
    title: '',
    message: err.message
  };

  // Only show stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stackTrace = err.stack;
  }

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      response.title = 'Validation Error';
      break;

    case constants.UNAUTHORIZED:
      response.title = 'Unauthorized';
      break;

    case constants.FORBIDDEN:
      response.title = 'Forbidden';
      break;

    case constants.NOT_FOUND:
      response.title = 'Not Found';
      break;

    case constants.SERVER_ERROR:
      response.title = 'Internal Server Error';
      break;

    default:
      response.title = 'Error';
      break;
  }

  res.json(response);
};

module.exports = errorHandler;
