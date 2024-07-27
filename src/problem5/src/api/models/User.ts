import { Schema, model } from "mongoose"
import BaseModel from "../abstract/BaseModel"

const userSchema = new Schema({
  email: { type: String, unique: true },
  name: { type: String, required: true },
  age: Number
})

export default class UserModel extends BaseModel {
  constructor() {
    super(userSchema, 'User')
  }
}