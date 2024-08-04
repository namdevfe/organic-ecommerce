import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { IBrand } from '~/types/brand'
import ApiError from '~/utils/ApiError'
import { v2 as cloudinary } from 'cloudinary'

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IBrand>({
    title: Joi.string().required().trim().strict(),
    image: Joi.string().required().trim().strict().messages({
      'string.empty': 'Image is required.'
    })
  })
  const imageFileData = req.file
  try {
    const dataValidate = { ...req.body, image: imageFileData?.path }
    await correctCondition.validateAsync(dataValidate, { abortEarly: false })
    next()
  } catch (error) {
    if (imageFileData) cloudinary.uploader.destroy(imageFileData.filename)
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const brandValidation = {
  createBrand
}

export default brandValidation
