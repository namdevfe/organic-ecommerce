import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/constants/validators'
import { ORDER_STATUS } from '~/types/order'
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

const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object({
    status: Joi.string()
      .required()
      .valid(ORDER_STATUS.Cancelled, ORDER_STATUS.Processing, ORDER_STATUS.Succeed)
      .trim()
      .strict()
      .messages({
        'any.required': 'Status is required'
      })
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const orderValidation = {
  createOrder,
  updateOrderStatus
}

export default orderValidation
