import BaseError from "./baseError.js";

class NotFoundError extends BaseError {
  constructor(message = "Recurso não encontrado") {
    super(message, 404);
  }
}

export default NotFoundError;
