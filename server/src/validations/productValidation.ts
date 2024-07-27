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

const productValidation = {
  createProductByAdmin
}

export default productValidation
