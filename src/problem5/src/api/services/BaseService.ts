import { Model } from 'mongoose'
import BaseModel from '../abstract/BaseModel'
export default abstract class BaseService {
  model: BaseModel

  constructor(model: BaseModel) {
    this.model = model
  }

  public abstract getAll(): any
  public abstract create(input: any): any
  public abstract findById(_id: string): any
  public abstract findByFilter(filter: any, limit: number): any
  public abstract update(data: any, id: string): any
  public abstract delete(id: string): any
}