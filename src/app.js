import express from "express";
import connectsToDb from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
routes(app);

const connection = await connectsToDb();

connection.on("error", (err) => {
  console.error("Não foi possível se conectar ao banco de dados:", err);
});

connection.once("open", () => {
  console.log("Conexão com o banco de dados feita com sucesso!");
});

app.use(errorHandler);

export default app;
