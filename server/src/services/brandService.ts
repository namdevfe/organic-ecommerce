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

const getBrands = async (query?: any) => {
  try {
    const queryObj = { ...query }
    const excludeFields = ['page', 'limit', 'sort', 'fields']
    excludeFields.forEach((field) => delete queryObj[field])

    // Format query
    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (matchEl) => `$${matchEl}`)
    const formattedQueryObj = JSON.parse(queryString)

    // Filtering
    if (queryObj?.title) {
      formattedQueryObj.title = { $regex: queryObj.title, $options: 'i' }
    }

    // Build query command
    let queryCommand = Brand.find(formattedQueryObj)

    // Sorting
    if (query?.sort) {
      const sortBy = query.sort?.split(',').join(' ')
      queryCommand = queryCommand.sort(sortBy)
    }

    // Limiting fields
    if (query?.fields) {
      const fields = query.fields?.split(',').join(' ')
      queryCommand = queryCommand.select(fields)
    }

    // Pagination
    const page = +query?.page || 1
    const limit = +query?.limit || 1
    const skip = (page - 1) * limit
    queryCommand = queryCommand.limit(limit).skip(skip)

    // Execute query
    const count = await Brand.find(formattedQueryObj).countDocuments()
    const brands = await queryCommand.exec()

    // Return data
    const totalPage = Math.ceil(count / limit)
    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Get brands is successfully',
      data: {
        count,
        brands,
        pagination: {
          currentPage: page,
          totalPage
        }
      }
    }
    return response
  } catch (error) {
    throw error
  }
}

const updateBrand = async (slug: string, dataUpdate: IBrand, imageFileData?: ICloudinaryFile) => {
  try {
    // Check brand already exist
    const alreadyBrand = await Brand.findOne({ slug })
    if (!alreadyBrand && imageFileData) {
      cloudinary.uploader.destroy(imageFileData.filename)
      throw new ApiError(StatusCodes.NOT_FOUND, 'Not found.')
    }

    const newSlug = dataUpdate.title ? slugify(dataUpdate.title) : undefined
    const updatedBrand = await Brand.findOneAndUpdate(
      { slug },
      { ...dataUpdate, slug: newSlug, image: imageFileData?.path },
      { new: true }
    )

    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Updated brand is successfully.',
      data: updatedBrand
    }

    return response
  } catch (error) {
    if (imageFileData) cloudinary.uploader.destroy(imageFileData.filename)
    throw error
  }
}

const brandService = {
  createBrand,
  getBrandBySlug,
  getBrands,
  updateBrand
}

export default brandService
