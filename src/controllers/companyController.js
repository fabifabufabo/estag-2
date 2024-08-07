import { companies } from "../models/index.js";
import NotFoundError from "../errors/notFoundError.js";
import validateCompany from "../usecases/validateCompany.js";
import buildSearchQuery from "../usecases/buildSearchQuery.js";

class CompanyController {
  static async countCompanies() {
    const companiesFound = await companies.find();
    return companiesFound.length;
  }
  
  static async registerCompany(req, res, next) {
    try {
      validateCompany(req.body);
      const newCompany = await companies.create(req.body);
      res.status(201).json(newCompany);
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
      validateCompany(req.body, true);

      const id = req.params.id;
      const updatedCompany = await companies.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true,
      });

      if (!updatedCompany) {
        next(new NotFoundError("Loja não encontrada!"));
        return;
      }

      res.status(200).json({ updatedCompany });
    } catch (err) {
      next(err);
    }
  }

  static async listCompanies(req, res, next) {
    try {
      const search = buildSearchQuery(req.query);

      const searchResults = companies.find(search);
      req.result = searchResults;

      next();
    } catch (err) {
      next(err);
    }
  }
}

export default CompanyController;
