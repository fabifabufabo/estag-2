import mongoose from "mongoose";
import baseError from "../erros/baseError.js";
import validationError from "../erros/validationError.js";
import invalidRequestError from "../erros/badRequestError.js";

function errorHandler(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new invalidRequestError().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new validationError(err).sendResponse(res);
  } else if (err instanceof baseError) {
    err.sendResponse(res);
  } else {
    new baseError().sendResponse(res);
  }
}

export default errorHandler;
