import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import productService from '~/services/productService'
import { AuthRequestCustom, IJWTPayload } from '~/types/auth'

// ADMIN
const createProductByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createProduct = await productService.createProductByAdmin(req.body)
    return res.json({
      statusCode: StatusCodes.CREATED,
      message: 'Create new product is successfully.',
      data: createProduct
    })
  } catch (error) {
    next(error)
  }
}

const updateProductByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params
  try {
    const updatedProduct = await productService.updateProductByAdmin(productId, req.body)
    return res.json({
      statusCode: StatusCodes.OK,
      message: `Product with id = ${updatedProduct?._id} updated is successfully.`,
      data: updatedProduct
    })
  } catch (error) {
    next(error)
  }
}

const deleteProductByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params
  try {
    const deletedProduct = await productService.deleteProductByAdmin(productId)
    return res.json({
      statusCode: StatusCodes.OK,
      message: `Deleted product with id = ${deletedProduct?._id} is successfully.`
    })
  } catch (error) {
    next(error)
  }
}

const getProductDetail = async (req: Request, res: Response, next: NextFunction) => {
  const { productId } = req.params
  try {
    const productDetail = await productService.getProductDetail(productId)
    return res.json({
      statusCode: StatusCodes.OK,
      message: 'Get product detail is successfully.',
      data: productDetail
    })
  } catch (error) {
    next(error)
  }
}

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productService.getProducts(req.query)
    return res.json({
      statusCode: StatusCodes.OK,
      message: 'Get list products is successfully.',
      data: products
    })
  } catch (error) {
    next(error)
  }
}

const ratingProduct = async (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  const { productId } = req.params
  const { uid } = req.user as IJWTPayload
  try {
    const ratingProduct = await productService.ratingProduct({ productId, uid, ...req.body })
    return res.json({
      statusCode: StatusCodes.OK,
      message: 'Rated product is successfully.',
      data: ratingProduct
    })
  } catch (error) {
    next(error)
  }
}

const productController = {
  createProductByAdmin,
  updateProductByAdmin,
  deleteProductByAdmin,
  getProductDetail,
  getProducts,
  ratingProduct
}

export default productController
