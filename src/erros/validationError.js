import invalidRequestError from "./badRequestError.js";

class validationError extends invalidRequestError {
  constructor(err) {
    const errorMessages = Object.values(err.errors)
      .map((err) => err.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errorMessages}`);
  }
}

export default validationError;
