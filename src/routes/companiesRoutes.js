import express from "express";
import CompanyController from "../controllers/companyController.js";
import paginate from "../middlewares/paginate.js";

const routes = express.Router();

routes.get("/companies", CompanyController.listCompanies, paginate);
routes.get("/companies/:id", CompanyController.listCompanyById);
routes.post("/companies", CompanyController.registerCompany);
routes.patch("/companies/:id", CompanyController.updateCompany);

export default routes;
