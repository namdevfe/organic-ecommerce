import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import blogCategoryService from '~/services/blogCategoryService'

const createBlogCategoryByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdBlogCategory = await blogCategoryService.createBlogCategoryByAdmin(req.body)
    return res.json({
      statusCode: StatusCodes.CREATED,
      message: 'Blog category created new is successfully.',
      data: createdBlogCategory
    })
  } catch (error) {
    next(error)
  }
}

const blogCategoryController = {
  createBlogCategoryByAdmin
}

export default blogCategoryController
