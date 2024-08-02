import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/constants/validators'
import { IBlog } from '~/types/blog'
import ApiError from '~/utils/ApiError'

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IBlog>({
    title: Joi.string().required().trim().strict(),
    description: Joi.string().required().trim().strict(),
    blogCategory: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    coverImage: Joi.string().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IBlog>({
    title: Joi.string().trim().strict(),
    description: Joi.string().trim().strict(),
    blogCategory: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    coverImage: Joi.string().trim().strict()
  })

  try {
    if (Object.keys(req.body).length === 0)
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Must have data to update blog.')
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const blogValidation = {
  createBlog,
  updateBlog
}

export default blogValidation
