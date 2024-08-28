import express from "express";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import MongoDB from "./config/mongoDB.js";

const app = express();
routes(app);

MongoDB.init();

app.use(errorHandler);

export default app;
