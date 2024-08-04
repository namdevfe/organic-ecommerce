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

const brandService = {
  createBrand
}

export default brandService
