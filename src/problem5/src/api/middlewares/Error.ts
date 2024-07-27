import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { HttpStatusCode } from "../constants/HttpStatusCode";

export default function errorMiddleWare(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR
  const message = err.message || "Something went wrong"
  return res.status(status).json({
    status,
    message
  })
}