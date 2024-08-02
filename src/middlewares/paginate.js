import CompanyController from "../controllers/companyController.js";
import BadRequestError from "../errors/badRequestError.js";

async function paginate(req, res, next) {
  try {
    let { limit = 5, from = 0, order = 1 } = req.query;

    limit = parseInt(limit);
    order = parseInt(order);

    const result = req.result;

    if (limit > 0 && from >= 0) {
      const paginatedResults = await result
        .find()
        .skip(from)
        .limit(limit)
        .exec();

      const totalCompanies = await CompanyController.countCompanies();

      res.status(200).json({ total: totalCompanies, data: paginatedResults });
    } else {
      next(new BadRequestError());
    }
  } catch (err) {
    next(err);
  }
}

export default paginate;
