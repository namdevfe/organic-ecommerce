/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import Blog from '~/models/blogModel'
import { IBlog } from '~/types/blog'
import { IResponseReturn } from '~/types/common'
import ApiError from '~/utils/ApiError'
import slugify from '~/utils/slugify'

const createBlog = async (data: IBlog) => {
  const { title, description, blogCategory } = data || {}
  try {
    const alreadyBlog = await Blog.findOne({ title })
    if (alreadyBlog)
      throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, `Blog with title = ${title} is already exist.`)

    const slug = slugify(title)
    const createdBlog = await Blog.create({ title, slug, description, blogCategory })

    const response: IResponseReturn = {
      statusCode: StatusCodes.CREATED,
      message: 'Created new blog is successfully.',
      data: createdBlog
    }
    return response
  } catch (error) {
    throw error
  }
}

const getBlogBySlug = async (slug: string) => {
  try {
    const blogDetails = await Blog.findOne({ slug }).populate('blogCategory')
    if (!blogDetails) throw new ApiError(StatusCodes.NOT_FOUND, `Blog with slug = ${slug} not found.`)

    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Get blog detail is successfully.',
      data: blogDetails
    }
    return response
  } catch (error) {
    throw error
  }
}

const blogService = {
  createBlog,
  getBlogBySlug
}

export default blogService
