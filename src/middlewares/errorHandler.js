import mongoose from "mongoose";
import BaseError from "../errors/baseError.js";
import ValidationError from "../errors/validationError.js";
import BadRequestError from "../errors/badRequestError.js";

function errorHandler(err, req, res, next) {
  let error = new BaseError();

  if (err instanceof mongoose.Error.CastError) {
    error = new BadRequestError();
  } else if (err instanceof mongoose.Error.ValidationError) {
    error = new ValidationError(err);
  } else if (err instanceof BaseError) {
    error = err;
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
