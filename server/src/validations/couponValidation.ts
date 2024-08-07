import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ICoupon, IUpdateCoupon } from '~/types/coupon'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/constants/validators'

const createCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<ICoupon>({
    name: Joi.string().required().trim().strict().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name is not allowed to be empty'
    }),
    expiredTime: Joi.number().required().messages({
      'any.required': 'Expired Time is required'
    }),
    discount: Joi.number().required().messages({
      'any.required': 'Discount is required'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const updateCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IUpdateCoupon>({
    couponId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    name: Joi.string().trim().strict().messages({
      'string.empty': 'Name is not allowed to be empty'
    }),
    expiredTime: Joi.number(),
    discount: Joi.number()
  })

  try {
    if (Object.keys(req.body).length === 0)
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Must have data to update coupon.')
    const { couponId } = req.params
    await correctCondition.validateAsync({ ...req.body, couponId }, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const couponValidation = {
  createCoupon,
  updateCoupon
}

export default couponValidation
