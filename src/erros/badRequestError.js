import baseError from "./baseError.js";

class invalidRequestError extends baseError {
  constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
    super(mensagem, 400);
  }
}

export default invalidRequestError;
