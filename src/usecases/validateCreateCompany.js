import ValidationError from "../errors/validationError.js";

function validateCreateCompany(company) {
  const cpfCnpjRegex =
    /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;

  const listErrrors = [];

  for (const key in company) {
    if (!company[key]) {
      listErrrors.push(`O campo ${key} é obrigatório`);
    }
  }

  if (company.document) {
    if (!cpfCnpjRegex.test(company.document)) {
      listErrrors.push("O documento deve ser um CPF ou CNPJ válido");
    }
  }

  if (listErrrors.length > 0) {
    throw new ValidationError(listErrrors);
  }

  return true;
}

export default validateCreateCompany;
