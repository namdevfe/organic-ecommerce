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

const blogController = {
  createBlog
}

export default blogController
