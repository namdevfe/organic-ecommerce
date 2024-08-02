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

const getBlogs = async (query?: any) => {
  try {
    // BUILD QUERY
    const queryObj = { ...query }
    // Remove exclude field from query object
    const excludeFields = ['page', 'limit', 'sort', 'fields']
    excludeFields.forEach((fieldKey: string) => delete queryObj[fieldKey])

    // Format query object correct with operators in mongodb
    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (matchEl) => `$${matchEl}`)
    const formattedQueryObj = JSON.parse(queryString)

    // Filtering
    if (queryObj?.title) {
      formattedQueryObj.title = { $regex: queryObj.title, $options: 'i' }
    }

    let queryCommand = Blog.find(formattedQueryObj)

    // Sorting
    if (query?.sort) {
      const sortBy = query.sort.split(',').join(' ')
      queryCommand = queryCommand.sort(sortBy)
    }

    // Fields Limiting
    if (query?.fields) {
      const fields = query.fields.split(',').join(' ')
      queryCommand = queryCommand.select(fields)
    }

    // Pagination
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 1
    const skip = (page - 1) * limit
    queryCommand = queryCommand.limit(limit).skip(skip)

    // EXECUTE QUERY COMMAND
    const count = await Blog.find(formattedQueryObj).countDocuments()
    const blogs = await queryCommand.exec()

    return {
      count,
      blogs
    }
  } catch (error) {
    throw error
  }
}

const updateBlog = async (slug: string, updateData: IBlog) => {
  try {
    const alreadyBlog = await Blog.findOne({ slug })
    if (!alreadyBlog) throw new ApiError(StatusCodes.NOT_FOUND, `Blog with slug = ${slug} not found.`)
    const newSlug = updateData.title ? slugify(updateData.title) : undefined
    const updatedBlog = await Blog.findOneAndUpdate({ slug }, { ...updateData, slug: newSlug }, { new: true })
    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: `Updated blog with slug = ${slug} is successfully.`,
      data: updatedBlog
    }
    return response
  } catch (error) {
    throw error
  }
}

const blogService = {
  createBlog,
  getBlogBySlug,
  getBlogs,
  updateBlog
}

export default blogService
