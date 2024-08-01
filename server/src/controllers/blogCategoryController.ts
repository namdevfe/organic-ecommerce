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

const getBlogCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params
  try {
    const blogCategoryDetails = await blogCategoryService.getBlogCategoryBySlug(slug)
    return res.json({
      statusCode: StatusCodes.OK,
      message: 'Get blog category details is successfully.',
      data: blogCategoryDetails
    })
  } catch (error) {
    next(error)
  }
}

const getBlogCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogCategories = await blogCategoryService.getBlogCategories(req.query)
    return res.json({
      statusCode: StatusCodes.OK,
      message: 'Get list blog categories is successfully.',
      data: blogCategories
    })
  } catch (error) {
    next(error)
  }
}

const updateBlogCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { blogCategoryId } = req.params
  try {
    const updateBlogCategory = await blogCategoryService.updateBlogCategoryByAdmin(blogCategoryId, req.body)
    return res.json({
      statusCode: StatusCodes.OK,
      message: 'Updated blog categories is successfully.',
      data: updateBlogCategory
    })
  } catch (error) {
    next(error)
  }
}

const blogCategoryController = {
  createBlogCategoryByAdmin,
  updateBlogCategory,
  getBlogCategoryBySlug,
  getBlogCategories
}

export default blogCategoryController
