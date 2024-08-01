import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { IBlogCategory } from '~/types/blogCategory'
import ApiError from '~/utils/ApiError'

const createBlogCategoryByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IBlogCategory>({
    title: Joi.string().required().trim().strict(),
    description: Joi.string().required().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const updateBlogCategoryByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IBlogCategory>({
    title: Joi.string().trim().strict(),
    description: Joi.string().trim().strict()
  })

  try {
    if (!Object.keys(req.body).length) throw new Error('Must have data to update.')
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const blogCategoryValidation = {
  createBlogCategoryByAdmin,
  updateBlogCategoryByAdmin
}

export default blogCategoryValidation
