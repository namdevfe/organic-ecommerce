import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import productCategoryService from '~/services/productCategoryService'

const createProductCategoryByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdProductCategory = await productCategoryService.createProductCategoryByAdmin(req.body)
    return res.json({
      statusCode: StatusCodes.CREATED,
      message: 'Created new product category is successfully.',
      data: createdProductCategory
    })
  } catch (error) {
    next(error)
  }
}

const updateProductCategoryByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { productCategoryId } = req.params
  try {
    const updatedProductCategory = await productCategoryService.updateProductCategoryByAdmin(
      productCategoryId,
      req.body
    )
    return res.json({
      statusCode: StatusCodes.OK,
      message: 'Product category updated is successfully.',
      data: updatedProductCategory
    })
  } catch (error) {
    next(error)
  }
}

const deleteProductCategoryByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { productCategoryId } = req.params
  try {
    const deletedProductCategory = await productCategoryService.deleteProductCategoryByAdmin(productCategoryId)
    return res.json({
      statusCode: StatusCodes.OK,
      message: `Product category with id = ${deletedProductCategory?._id} is successfully.`
    })
  } catch (error) {
    next(error)
  }
}

const getProductCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params
  try {
    const productCategory = await productCategoryService.getProductCategoryBySlug(slug)
    return res.json({
      statusCode: StatusCodes.OK,
      message: 'Get product category details is successfully.',
      data: productCategory
    })
  } catch (error) {
    next(error)
  }
}

const productCategoryController = {
  createProductCategoryByAdmin,
  updateProductCategoryByAdmin,
  deleteProductCategoryByAdmin,
  getProductCategoryBySlug
}

export default productCategoryController
