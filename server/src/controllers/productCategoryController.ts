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

const productCategoryController = {
  createProductCategoryByAdmin
}

export default productCategoryController
