import "dotenv/config";

import express from "express";
import usersRoutes from "./routes/users.routes.js";

const app = express();
app.use(express.json());

app.use("/usuarios", usersRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
