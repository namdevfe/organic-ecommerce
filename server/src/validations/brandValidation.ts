import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import { IBrand } from '~/types/brand'
import ApiError from '~/utils/ApiError'
import { v2 as cloudinary } from 'cloudinary'

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IBrand>({
    title: Joi.string().required().trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title is not allowd to be empty'
    }),
    image: Joi.string().required().trim().strict().messages({
      'any.required': 'Image is required',
      'string.empty': 'Image is not allowed to be empty'
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

const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IBrand>({
    title: Joi.string().trim().strict().messages({
      'string.empty': 'Title is not allowd to be empty'
    }),
    image: Joi.string().trim().strict().messages({
      'string.empty': 'Image is not allowed to be empty'
    })
  })
  const imageFileData = req.file
  try {
    const dataValidate = { ...req.body }
    if (imageFileData) {
      dataValidate.image = imageFileData.path
    }

    if (Object.keys(dataValidate).length === 0) {
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Must have data to update brand.')
    }
    await correctCondition.validateAsync(dataValidate, { abortEarly: false })
    next()
  } catch (error) {
    if (imageFileData) cloudinary.uploader.destroy(imageFileData.filename)
    if (error instanceof Error) next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const brandValidation = {
  createBrand,
  updateBrand
}

export default brandValidation
