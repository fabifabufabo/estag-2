import ValidationError from "../errors/validationError.js";

function validateCompanyCreate(company) {
  const cpfCnpjRegex =
    /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;

  const listErrors = [];

  const requiredKeys = ["name", "document", "city", "image"];
  for (let key of requiredKeys) {
    if (!company[key]) {
      listErrors.push(`O campo '${key}' é obrigatório!`);
    }
  }

  if (company.document && !cpfCnpjRegex.test(company.document)) {
    listErrors.push("O documento deve ser um CPF ou CNPJ válido");
  }

  if (listErrors.length > 0) {
    throw new ValidationError(listErrors);
  }
}

export default validateCompanyCreate;
