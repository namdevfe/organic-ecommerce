import { StatusCodes } from 'http-status-codes'
import ProductCategory from '~/models/productCategoryModel'
import { IProductCategory } from '~/types/productCategory'
import ApiError from '~/utils/ApiError'
import slugify from '~/utils/slugify'

/* eslint-disable no-useless-catch */
const createProductCategoryByAdmin = async (data: IProductCategory) => {
  try {
    const productCategory = await ProductCategory.findOne({ title: data.title })

    if (productCategory)
      throw new ApiError(StatusCodes.BAD_REQUEST, `Product category title = ${data.title} has already exist.`)

    const slug = slugify(data.title)

    const createdProductCategory = await ProductCategory.create({ ...data, slug })

    return createdProductCategory
  } catch (error) {
    throw error
  }
}

const updateProductCategoryByAdmin = async (productCategoryId: string, data: IProductCategory) => {
  try {
    const slug = slugify(data.title)
    const updatedProductCategory = await ProductCategory.findByIdAndUpdate(
      productCategoryId,
      { ...data, slug },
      { new: true }
    )
    return updatedProductCategory
  } catch (error) {
    throw error
  }
}

const deleteProductCategoryByAdmin = async (productCategoryId: string) => {
  try {
    const deletedProductCategory = await ProductCategory.findByIdAndDelete(productCategoryId, { new: true })
    return deletedProductCategory
  } catch (error) {
    throw error
  }
}

const productCategoryService = {
  createProductCategoryByAdmin,
  updateProductCategoryByAdmin,
  deleteProductCategoryByAdmin
}

export default productCategoryService
