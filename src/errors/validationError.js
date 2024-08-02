import BadRequestError from "./badRequestError.js";

class ValidationError extends BadRequestError {
  constructor(err) {
    const errorMessages = Object.values(err.errors)
      .map((err) => err.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errorMessages}`);
  }
}

export default ValidationError;
