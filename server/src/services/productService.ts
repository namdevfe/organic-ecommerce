/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import Product from '~/models/productModel'
import { ProductBodyTypes } from '~/types/product'
import ApiError from '~/utils/ApiError'
import slugify from '~/utils/slugify'

const createProductByAdmin = async (data: ProductBodyTypes) => {
  try {
    const productAlreadyExist = await Product.findOne({ title: data.title })

    if (productAlreadyExist)
      throw new ApiError(StatusCodes.BAD_REQUEST, `Product title = ${productAlreadyExist.title} has already exist.`)

    const slug = slugify(data.title)

    const createdProduct = await Product.create({ ...data, slug })

    return createdProduct
  } catch (error) {
    throw error
  }
}

const updateProductByAdmin = async (productId: string, updateData: ProductBodyTypes) => {
  try {
    const slug = slugify(updateData.title)
    const updatedProduct = await Product.findByIdAndUpdate(productId, { ...updateData, slug }, { new: true })
    return updatedProduct
  } catch (error) {
    throw error
  }
}

const productService = {
  createProductByAdmin,
  updateProductByAdmin
}

export default productService
