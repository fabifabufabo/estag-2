import express from "express";
import CompanyController from "../controllers/companyController.js";

const routes = express.Router();

routes.get("/companies", CompanyController.listCompanies);
routes.get("/companies/:id", CompanyController.listCompanyById);
routes.post("/companies", CompanyController.registerCompany);
routes.patch("/companies/:id", CompanyController.updateCompany);

export default routes;
