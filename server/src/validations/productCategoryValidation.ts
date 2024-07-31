import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { ProductCategoryBodyTypes } from '~/types/productCategory'
import ApiError from '~/utils/ApiError'

const createProductCategoryByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<ProductCategoryBodyTypes>({
    title: Joi.string().required().trim().strict(),
    description: Joi.string().required().trim().strict()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const productCategoryValidation = {
  createProductCategoryByAdmin
}

export default productCategoryValidation
