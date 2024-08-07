import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { IAddToCart } from '~/types/cart'
import ApiError from '~/utils/ApiError'

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IAddToCart>({
    product: Joi.string().required().trim().strict().messages({
      'any.required': 'Product is required',
      'string.empty': 'Product is not allowed to be empty'
    }),
    buyQuantity: Joi.number().required().messages({
      'any.required': 'Buy quantity is required'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const cartValidation = {
  addToCart
}

export default cartValidation
