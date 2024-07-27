import {BaseController} from './BaseController';
import * as express from 'express';
export default abstract class BaseRoute {
  public path: string;
  public controller: BaseController;
  constructor(path: string, controller: BaseController) {
    this.path = path;
    this.controller = controller;
  }
  public abstract initializeRoutes(): express.Router;
}