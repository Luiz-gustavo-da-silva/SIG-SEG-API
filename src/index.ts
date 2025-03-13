import express, { Express } from "express";
import rootRouter from "./router";
import { PrismaClient } from "@prisma/client";
import { PORT } from "./secrets";
import { errorMiddleware } from "./middlewares/errors";
import YAML from "js-yaml";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const swaggerFile = YAML.load(
  fs.readFileSync(path.join(__dirname, "../swagger.yaml"), "utf8")
);

var cors = require("cors");

const app: Express = express();

app.use(express.json());

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api", rootRouter);

export const prismaCilent = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
