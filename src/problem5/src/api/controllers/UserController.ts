import * as express from "express";
import { Logger } from "../../utils/Logger"
import { BaseController } from "../abstract/BaseController"
import { HttpStatusCode } from "../constants/HttpStatusCode"
import HttpException from "../exceptions/HttpException"
import _ from "lodash"
import UserService from "../services/UserService";

const DEFAULT_LIMIT = 10
class UserController extends BaseController {
  constructor(service: UserService) {
    super(service)
  }

  getAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const users = await this.service.getAll()
      return res.status(HttpStatusCode.OK).json({ users })
    } catch (error) {
      Logger.error('GetAllError', error)
      next(error)
    }
  }

  getById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { params } = req
      const { id } = params
      const user = await this.service.findById(id)
      return res.status(HttpStatusCode.OK).json({ user })
    } catch (error) {
      Logger.error('GetUserByIdError', error)
      next(error)
    }
  }

  getUserByFilter = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { query } = req
      const { name, age, email, limit } = query

      let limitInput = DEFAULT_LIMIT
      if (typeof limit === 'string') {
        limitInput = parseInt(limit, 10);
      }
      let ageInput;
      if (typeof age === 'string') {
        ageInput = parseInt(age, 10);
      }

      const users = await this.service.findByFilter({ name, age: ageInput, email }, limitInput)
      return res.status(HttpStatusCode.OK).json({ users })
    } catch (error) {
      Logger.error('GetUserByFilterError', error)
      next(error)
    }
  }

  create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { body } = req
      const { name, age, email } = body

      if (!email) {
        throw new HttpException(HttpStatusCode.BAD_REQUEST, "Bad input")
      }

      const existedUser = await this.service.findByFilter({ email }, 1)
      if (existedUser.length) {
        throw new HttpException(HttpStatusCode.BAD_REQUEST, "Email already exists")
      }

      const newUser = await this.service.create({
        name,
        age,
        email
      })
      return res.status(HttpStatusCode.CREATED).json({ message: 'Created user successfully', user: newUser })
    } catch (error) {
      Logger.error('AddUserError', error)
      next(error)
    }
  }

  update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { params, body } = req
      const { name, age } = body
      const updateData = _.omitBy({
        name,
        age
      }, _.isNil)

      const { id } = params
      const existedUser = await this.service.findById(id)

      if (!existedUser) {
        throw new HttpException(HttpStatusCode.NOT_FOUND, 'User not found')
      }

      const updatedUser = await this.service.update(updateData, id)
      return res.status(HttpStatusCode.OK).json({ user: updatedUser, message: 'Updated user successfully' })
    } catch (error) {
      Logger.error('UpdateUserError', error)
      next(error)
    }
  }

  delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { params } = req
      const { id } = params
      const existedUser = await this.service.findById(id)

      if (!existedUser) {
        throw new HttpException(HttpStatusCode.NOT_FOUND, 'User not found')
      }

      await this.service.delete(id)
      return res.status(HttpStatusCode.OK).json({ _id: id })
    } catch (error) {
      Logger.error('DeleteUserError', error)
      next(error)
    }
  }
}

export default UserController