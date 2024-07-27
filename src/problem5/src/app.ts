import express, { urlencoded } from "express";
import errorMiddleware from "./api/middlewares/Error"
import swaggerUi from "swagger-ui-express";
import morgan from "morgan"
import BaseRoute from "./api/abstract/BaseRoute";
import * as swaggerDocument from "./swagger.json";


class App {
  public app: express.Application;
  public port: number;

  constructor(routes: BaseRoute[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.app.use(errorMiddleware)
  }

  private initializeMiddlewares() {
    this.app.use(urlencoded({ extended: true }))
    this.app.use(express.json());
    this.app.use(morgan("dev"))
  }

  private initializeRoutes(routes: BaseRoute[]) {
    this.app.get("/", (request, response) => {
      response.send("Application is running");
    });
    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
    routes.forEach((route) => {
      this.app.use("/", route.initializeRoutes());
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;