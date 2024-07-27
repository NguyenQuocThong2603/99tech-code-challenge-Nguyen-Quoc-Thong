import * as express from "express";
import BaseService from "../services/BaseService";
export abstract class BaseController {
  public router: express.Router;
  public service: BaseService

  constructor(service: BaseService) {
    this.router = express.Router();
    this.service = service
  }
  public abstract getAll(req: express.Request, res: express.Response, next: express.NextFunction): void;
  public abstract create(req: express.Request, res: express.Response, next: express.NextFunction): void;
  public abstract delete(req: express.Request, res: express.Response, next: express.NextFunction): void;
  public abstract update(req: express.Request, res: express.Response, next: express.NextFunction): void;
  public abstract getById(req: express.Request, res: express.Response, next: express.NextFunction): void;
  public abstract getUserByFilter(req: express.Request, res: express.Response, next: express.NextFunction): void;
}