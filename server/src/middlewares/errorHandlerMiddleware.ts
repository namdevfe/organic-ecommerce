import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IApiError } from '~/types/apiError'
import ApiError from '~/utils/ApiError'

export const notFoundErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(StatusCodes.NOT_FOUND, `Route ${req.originalUrl} not found.`))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const errorHandlerMiddleware = (err: IApiError, req: Request, res: Response, next: NextFunction) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }

  return res.status(responseError.statusCode).json(responseError)
}

export default errorHandlerMiddleware
