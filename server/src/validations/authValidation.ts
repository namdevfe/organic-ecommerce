import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import { IRegisterBody } from '~/types/auth'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const register = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IRegisterBody>({
    firstName: Joi.string().required().trim().strict(),
    lastName: Joi.string().required().trim().strict(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 1, tlds: { allow: ['com'] } })
      .trim()
      .strict(),
    username: Joi.string().required().min(3).trim().strict(),
    password: Joi.string().required().trim().strict(),
    phone: Joi.string().required().length(10).trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const authValidation = {
  register
}

export default authValidation
