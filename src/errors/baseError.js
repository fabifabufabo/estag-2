class BaseError extends Error {
  constructor(message = "Erro interno do servidor", status = 500) {
    super();
    this.message = message;
    this.status = status;
  }
}

export default BaseError;
