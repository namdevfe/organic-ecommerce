import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ICoupon } from '~/types/coupon'
import ApiError from '~/utils/ApiError'

const createCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<ICoupon>({
    name: Joi.string().required().trim().strict().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is not allowed to be empty'
    }),
    expiredTime: Joi.number().required().messages({
      'any.required': 'Expired Time is required'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const couponValidation = {
  createCoupon
}

export default couponValidation
