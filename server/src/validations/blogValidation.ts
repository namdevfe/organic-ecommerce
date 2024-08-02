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

const blogValidation = {
  createBlog
}

export default blogValidation
