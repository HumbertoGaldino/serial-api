import "dotenv/config";

import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import schemasSwagger from "./schemas.json" with { type: "json" };

import express from "express";
import usersRoutes from "./routes/users.routes.js";
import tvShowRoutes from "./routes/tvshows.routes.js";
import tmdbRoutes from "./routes/tmdb.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
import episodesRoutes from "./routes/episodes.routes.js";

import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.use("/user", usersRoutes);
app.use("/tvshow", auth, tvShowRoutes);
app.use("/api", tmdbRoutes)
app.use("/movies", moviesRoutes);
app.use("/episodes", auth, episodesRoutes);
//Documentação da API
var swaggerDefinition = {
  info: {
    title: "Serial API",
    version: "1.0.0",
    description: "Documentação da API do projeto Serial.",
  },
  components: {
    schemas: schemasSwagger,
  },
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["src/routes/*.js"],
};

var swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
