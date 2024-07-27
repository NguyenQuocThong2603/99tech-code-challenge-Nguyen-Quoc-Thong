import * as express from "express";
import UserController from "../controllers/UserController";
import BaseRoute from "../abstract/BaseRoute";
import UserService from "../services/UserService";
import UserModel from "../models/User";

export default class UserRoute extends BaseRoute {
  public router: express.Router;

  constructor() {
    const userModel = new UserModel()
    const userUservice = new UserService(userModel)
    const userController = new UserController(userUservice)
    super("/users", userController);
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes(): express.Router {
    this.router.get(this.path, this.controller.getUserByFilter)
    this.router.get(`${this.path}/:id`, this.controller.getById)

    this.router.post(this.path, this.controller.create)

    this.router.put(`${this.path}/:id`, this.controller.update)

    this.router.delete(`${this.path}/:id`, this.controller.delete)
    return this.router;
  }
}