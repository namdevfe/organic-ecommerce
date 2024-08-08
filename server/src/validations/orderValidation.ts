import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/constants/validators'
import ApiError from '~/utils/ApiError'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object({
    coupon: Joi.string().pattern(OBJECT_ID_RULE).trim().strict().message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const orderValidation = {
  createOrder
}

export default orderValidation
