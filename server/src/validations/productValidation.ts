import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { ProductBodyTypes } from '~/types/product'
import ApiError from '~/utils/ApiError'

const createProductByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<ProductBodyTypes>({
    title: Joi.string().required().trim().strict(),
    // slug: Joi.string().required().trim().strict(),
    description: Joi.string().required().trim().strict(),
    brand: Joi.string().required().trim().strict(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
    }
  }
}

const updateProductByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<ProductBodyTypes>({
    title: Joi.string().trim().strict(),
    description: Joi.string().trim().strict(),
    brand: Joi.string().trim().strict(),
    price: Joi.number(),
    quantity: Joi.number()
  })

  try {
    if (Object.keys(req.body).length === 0)
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Must have product data update.')
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const productValidation = {
  createProductByAdmin,
  updateProductByAdmin
}

export default productValidation
