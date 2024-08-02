import { NextFunction, Request, Response } from 'express'
import blogService from '~/services/blogService'

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdBlog = await blogService.createBlog(req.body)
    return res.json(createdBlog)
  } catch (error) {
    next(error)
  }
}

const getBlogBySlug = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params
  try {
    const blogDetails = await blogService.getBlogBySlug(slug)
    return res.json(blogDetails)
  } catch (error) {
    next(error)
  }
}

const blogController = {
  createBlog,
  getBlogBySlug
}

export default blogController
