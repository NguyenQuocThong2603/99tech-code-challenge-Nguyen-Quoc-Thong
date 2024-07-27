import { model, Model, Schema } from "mongoose";

export default abstract class BaseModel {

  databaseModel: Model<any>
  constructor(schema: Schema, modelName: string) {
    this.databaseModel = model(modelName, schema)
  }
}