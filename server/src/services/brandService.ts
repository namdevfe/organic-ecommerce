/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import Brand from '~/models/brandModel'
import { IBrand } from '~/types/brand'
import { IResponseReturn } from '~/types/common'
import ApiError from '~/utils/ApiError'
import slugify from '~/utils/slugify'
import { v2 as cloudinary } from 'cloudinary'
import { ICloudinaryFile } from '~/types/cloudinary'

const createBrand = async (data: IBrand, imageFileData: ICloudinaryFile) => {
  try {
    const alreadyBrand = await Brand.findOne({ title: data.title })
    if (alreadyBrand && imageFileData) {
      cloudinary.uploader.destroy(imageFileData.filename)
      throw new ApiError(StatusCodes.BAD_REQUEST, `Brand title = ${data.title} already exist.`)
    }
    const slug = slugify(data.title)
    const createdBrand = await Brand.create({ ...data, slug, image: imageFileData.path })

    if (imageFileData && !createdBrand) {
      cloudinary.uploader.destroy(imageFileData.filename)
    }

    const response: IResponseReturn = {
      statusCode: StatusCodes.CREATED,
      message: 'Created brand successfully.',
      data: createdBrand
    }
    return response
  } catch (error) {
    if (imageFileData) cloudinary.uploader.destroy(imageFileData.filename)
    throw error
  }
}

const getBrandBySlug = async (slug: string) => {
  try {
    const brandDetails = await Brand.findOne({ slug })
    if (!brandDetails) throw new ApiError(StatusCodes.NOT_FOUND, 'Not found.')

    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Get brand detail is successfully.',
      data: brandDetails
    }
    return response
  } catch (error) {
    throw error
  }
}

const brandService = {
  createBrand,
  getBrandBySlug
}

export default brandService
