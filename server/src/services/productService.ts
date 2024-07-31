/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import Product from '~/models/productModel'
import { IRatingProduct, ProductBodyTypes } from '~/types/product'
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

const deleteProductByAdmin = async (productId: string) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId, { new: true })
    return deletedProduct
  } catch (error) {
    throw error
  }
}

const getProductDetail = async (productId: string) => {
  try {
    const productDetail = await Product.findById(productId)
    return productDetail
  } catch (error) {
    throw error
  }
}

const getProducts = async (query?: any) => {
  try {
    // BUILD QUERY
    const queryObj = { ...query }
    // Remove exclude field from query object
    const excludeFields = ['page', 'limit', 'sort', 'fields']
    excludeFields.forEach((fieldKey: string) => delete queryObj[fieldKey])

    // Format query object correct with operators in mongodb
    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (matchEl) => `$${matchEl}`)
    const formattedQueryObj = JSON.parse(queryString)

    // Filtering
    if (queryObj?.title) {
      formattedQueryObj.title = { $regex: queryObj.title, $options: 'i' }
    }

    let queryCommand = Product.find(formattedQueryObj)

    // Sorting
    if (query?.sort) {
      const sortBy = query.sort.split(',').join(' ')
      queryCommand = queryCommand.sort(sortBy)
    }

    // Fields Limiting
    if (query?.fields) {
      const fields = query.fields.split(',').join(' ')
      queryCommand = queryCommand.select(fields)
    }

    // Pagination
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 1
    const skip = (page - 1) * limit
    queryCommand = queryCommand.limit(limit).skip(skip)

    // EXECUTE QUERY COMMAND
    const count = await Product.find(formattedQueryObj).countDocuments()
    const products = await queryCommand.exec()

    if (!Object.keys(products).length) throw new ApiError(StatusCodes.NOT_FOUND, 'Products not found.')
    return {
      count,
      products
    }
  } catch (error) {
    throw error
  }
}

const ratingProduct = async (ratingData: IRatingProduct) => {
  const { productId, uid, star, comment } = ratingData || {}
  try {
    // Find product
    const product = await Product.findById(productId)
    const alreadyRating = product?.ratings.find((item) => item.postedBy?.toString() === uid)

    // Check rating of product found
    if (alreadyRating) {
      // If alreadyRating will update rating
      await Product.updateOne(
        { ratings: { $elemMatch: alreadyRating } },
        { $set: { 'ratings.$.star': star, 'ratings.$.comment': comment } },
        { new: true }
      )
    } else {
      // If not yet rated will create new rating
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star,
              comment,
              postedBy: uid
            }
          }
        },
        { new: true }
      )
    }

    const updatedRatingProduct = await Product.findById(productId)
    const totalStar = updatedRatingProduct?.ratings.reduce((total, ratingItem) => total + ratingItem.star, 0)
    const ratingCount = updatedRatingProduct?.ratings.length
    const totalRatings = Math.round((Number(totalStar) * 10) / Number(ratingCount)) / 10

    // Update total ratings field in db
    const res = await Product.findByIdAndUpdate(productId, { totalRatings }, { new: true })
    return res
  } catch (error) {
    throw error
  }
}

const productService = {
  createProductByAdmin,
  updateProductByAdmin,
  deleteProductByAdmin,
  getProductDetail,
  getProducts,
  ratingProduct
}

export default productService
