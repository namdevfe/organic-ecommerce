import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import productService from '~/services/productService'

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

const productController = {
  createProductByAdmin,
  updateProductByAdmin
}

export default productController
