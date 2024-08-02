import { companies } from "../models/index.js";
import NotFoundError from "../errors/notFoundError.js";
import validateCreateCompany from "../usecases/validateCreateCompany.js";

class CompanyController {
  static async registerCompany(req, res, next) {
    try {
      if (validateCreateCompany(req.body)) {
        const newCompany = await companies.create(req.body);
        res.status(201).json({ company: newCompany });
      }
    } catch (err) {
      next(err);
    }
  }

  static async listCompanyById(req, res, next) {
    try {
      const id = req.params.id;
      const foundCompany = await companies.findById(id);
      if (!foundCompany) {
        next(new NotFoundError("Loja não encontrada!"));
        return;
      }
      res.status(200).json(foundCompany);
    } catch (err) {
      next(err);
    }
  }

  static async updateCompany(req, res, next) {
    try {
      if (validateCreateCompany(req.body, true)) {
        const id = req.params.id;
        const updatedCompany = await companies.findByIdAndUpdate(id, req.body, {
          runValidators: true,
          new: true,
        });
        if (!updatedCompany) {
          next(new NotFoundError("Loja não encontrada!"));
          return;
        }
        res.status(200).json({ company: updatedCompany });
      }
    } catch (err) {
      next(err);
    }
  }

  static async listCompanies(req, res, next) {
    try {
      const search = buildSearchQuery(req.query);

      if (!search) {
        res.status(200).send([]);
        return;
      }

      const searchResults = companies.find(search);
      req.result = searchResults;

      next();
    } catch (err) {
      next(err);
    }
  }

  static async countCompanies() {
    const companiesFound = await companies.find();
    return companiesFound.length;
  }
}

function buildSearchQuery(params) {
  const { name, city, document } = params;

  let search = {};

  if (name) search.name = { $regex: name, $options: "i" };
  if (city) search.city = city;
  if (document) search.document = { $regex: document, $options: "i" };

  return search;
}

export default CompanyController;
