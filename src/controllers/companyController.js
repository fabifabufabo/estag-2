import { companies } from "../models/index.js";
import notFoundError from "../erros/notFoundError.js";

class CompanyController {
  static async registerCompany(req, res, next) {
    try {
      const newCompany = await companies.create(req.body);
      res.status(201).json({ message: "Loja criada!", company: newCompany });
    } catch (err) {
      next(err);
    }
  }

  static async listCompanyById(req, res, next) {
    try {
      const id = req.params.id;
      const foundCompany = await companies.findById(id);

      if (foundCompany !== null) {
        res.status(200).json(foundCompany);
      } else {
        next(new notFoundError("Id do livro não localizado"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateCompany(req, res, next) {
    try {
      const id = req.params.id;
      const foundCompany = await companies.findById(id);

      if (foundCompany !== null) {
        const id = req.params.id;
        const updatedCompany = await companies.findByIdAndUpdate(id, req.body, {
          runValidators: true,
          new: true,
        });
        res
          .status(200)
          .json({ message: "Loja atualizada!", company: updatedCompany });
      } else {
        next(new notFoundError("Id do livro não localizado"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async listCompanies(req, res, next) {
    try {
      const search = await buildSearchQuery(req.query);

      if (search !== null) {
        const searchResults = companies.find(search);

        req.result = searchResults;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (err) {
      next(err);
    }
  }

  static async countCompanies() {
    const companiesFound = await companies.find();
    return companiesFound.length;
  }
}

async function buildSearchQuery(params) {
  const { name, city, document } = params;
  
  let search = {};

  if (name) search.name = { $regex: name, $options: "i" };
  if (city) search.city = city;
  if (document) search.document = { $regex: document, $options: "i" };

  return search;
}

export default CompanyController;
