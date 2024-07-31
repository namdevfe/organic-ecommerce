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

const getProductCategoryBySlug = async (slug: string) => {
  try {
    const productCategory = await ProductCategory.findOne({ slug })
    if (!productCategory) throw new ApiError(StatusCodes.NOT_FOUND, 'Product category not found.')
    return productCategory
  } catch (error) {
    throw error
  }
}

const getProductCategories = async (query?: any) => {
  try {
    const queries = { ...query }
    const exludeFields = ['page', 'limit', 'sort', 'fields']
    exludeFields.forEach((field) => {
      delete queries[field]
    })

    // Format queries object
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (matchEl) => `$${matchEl}`)
    const formattedQueries = JSON.parse(queryString)

    // Filtering
    if (queries?.title) {
      formattedQueries.title = { $regex: queries.title, $options: 'i' }
    }

    // BUILD QUERY COMMAND
    let queryCommand = ProductCategory.find(formattedQueries)

    // Sorting
    if (query?.sort) {
      const sortBy = query.sort.split(',').join(' ')
      queryCommand = queryCommand.sort(sortBy)
    }

    // Fields limiting
    if (query?.fields) {
      const fields = query.fields.split(',').join(' ')
      queryCommand = queryCommand.select(fields)
    }

    // Pagination
    const page = query.page ? Number(query.page) : 1
    const limit = query.limit ? Number(query.limit) : 1
    const skip = (page - 1) * limit
    queryCommand = queryCommand.limit(limit).skip(skip)

    // EXEC QUERY COMMAND
    const productCategories = await queryCommand.exec()
    const count = productCategories.length

    return {
      count,
      productCategories
    }
  } catch (error) {
    throw error
  }
}

const productCategoryService = {
  createProductCategoryByAdmin,
  updateProductCategoryByAdmin,
  deleteProductCategoryByAdmin,
  getProductCategoryBySlug,
  getProductCategories
}

export default productCategoryService
