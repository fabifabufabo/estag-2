import BaseError from "../errors/baseError.js";
import ValidationError from "../errors/validationError.js";
import BadRequestError from "../errors/badRequestError.js";

function errorHandler(err, req, res, next) {
  let error = err;

  if (!(err instanceof BaseError)) {
    error = new BaseError(err.message);
  }

  return res.status(error.status).send({
    errors: [
      {
        description: error.message,
      },
    ],
  });
}

export default errorHandler;
