import express from "express";
import company from "./companiesRoutes.js";

const routes = (app) => {
  app
    .route("/")
    .get((req, res) => res.status(200).send("Táxi Carrara ou Carrara Táxi?"));

  app.use(express.json(), company);
};

export default routes;
