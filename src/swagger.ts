import swaggerJSDoc, { Options } from "swagger-jsdoc";
import { Express } from "express";
import swaggerUi from "swagger-ui-express";
const options: Options = {
  openapi: "3.0.0",
  definition: {
    info: {
      title: "Project Mangement API Documenation",
      version: "1.0.0",
      description: "Express API documentation",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/app.ts"],
  //apis: [`${process.cwd()}/src/routes/*.ts`, `${process.cwd()}/src/app.ts`],
};
const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
