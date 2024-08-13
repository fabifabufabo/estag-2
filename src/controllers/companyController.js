import { companies } from "../models/index.js";
import NotFoundError from "../errors/notFoundError.js";
import validateCompany from "../usecases/validateCompany.js";
import buildSearchQuery from "../usecases/buildSearchQuery.js";

class CompanyController {
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

      let { limit = 5, from = 0 } = req.query;
      limit = parseInt(limit);
      from = parseInt(from);

      if (limit > 0 && from >= 0) {
        const paginatedResults = await companies
          .find(search)
          .skip(from)
          .limit(limit)
          .exec();

        const totalCompanies = await companies.countDocuments(search);

        res.status(200).json({ total: totalCompanies, data: paginatedResults });
      } else {
        next(new BadRequestError());
      }
    } catch (err) {
      next(err);
    }
  }
}

export default CompanyController;
