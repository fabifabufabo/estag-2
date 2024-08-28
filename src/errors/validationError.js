import BadRequestError from "./badRequestError.js";

class ValidationError extends BadRequestError {
  constructor(err) {
    const errorMessages = err.join("; ");
    super(errorMessages);
  }
}

export default ValidationError;
