import baseError from "./baseError.js";

class notFoundError extends baseError {
  constructor(mensagem = "Página não encontrada") {
    super(mensagem, 404);
  }
}

export default notFoundError;
