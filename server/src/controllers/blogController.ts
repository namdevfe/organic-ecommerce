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

const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await blogService.getBlogs(req.query)
    return res.json(blogs)
  } catch (error) {
    next(error)
  }
}

const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params
  try {
    const updatedBlog = await blogService.updateBlog(slug, req.body)
    return res.json(updatedBlog)
  } catch (error) {
    next(error)
  }
}

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { slug } = req.params
  try {
    const deletedBlog = await blogService.deleteBlog(slug)
    return res.json(deletedBlog)
  } catch (error) {
    next(error)
  }
}

const blogController = {
  createBlog,
  getBlogBySlug,
  getBlogs,
  updateBlog,
  deleteBlog
}

export default blogController
