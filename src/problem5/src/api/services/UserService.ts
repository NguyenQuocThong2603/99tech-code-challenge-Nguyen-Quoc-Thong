import BaseModel from "../abstract/BaseModel";
import BaseService from "./BaseService";
import UserModel from "../models/User";
import _ from 'lodash'

export default class UserService extends BaseService {
  constructor(model: UserModel) {
    super(model)
  }

  async getAll() {
    const users = await this.model.databaseModel.find({}).lean()
    return users
  }

  async create(input: any) {
    const { email, name, age } = input

    const newUser = await this.model.databaseModel.create({ email, age, name })
    return newUser.toObject()
  }

  async findById(_id: string) {
    const user = await this.model.databaseModel.findOne({ _id }).lean()
    return user
  }

  async findByFilter(filter: any, limit: number = 10) {
    if (limit > 200) {
      limit = 200
    }

    const { email, name, age } = filter
    const criteria = _.omitBy({
      email: email ? new RegExp(email, 'i') : undefined,
      age,
      name: name ? new RegExp(name, 'i') : undefined
    }, _.isNil)

    const user = await this.model.databaseModel.find(criteria).limit(limit).lean()
    return user
  }

  async update(data: any, _id: string) {
    const user = await this.model.databaseModel.findOneAndUpdate({ _id }, data, { new: true }).lean()
    return user
  }

  async delete(_id: string) {
    await this.model.databaseModel.deleteOne({ _id })
  }
}