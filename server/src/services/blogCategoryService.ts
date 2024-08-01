/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import BlogCategory from '~/models/blogCategoryModel'
import { IBlogCategory } from '~/types/blogCategory'
import ApiError from '~/utils/ApiError'
import slugify from '~/utils/slugify'

const createBlogCategoryByAdmin = async (data: IBlogCategory) => {
  try {
    const alreadyBlogCategory = await BlogCategory.findOne({ title: data.title })
    if (alreadyBlogCategory) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `Blog category with title = ${alreadyBlogCategory.title} already exist.`
      )
    }

    const slug = slugify(data.title)
    const createData = { ...data, slug }
    const createdBlogCategory = await BlogCategory.create(createData)
    return createdBlogCategory
  } catch (error) {
    throw error
  }
}

const getBlogCategoryBySlug = async (slug: string) => {
  try {
    const blogCategoryDetails = await BlogCategory.findOne({ slug })
    if (!blogCategoryDetails) throw new ApiError(StatusCodes.NOT_FOUND, 'Not found.')
    return blogCategoryDetails
  } catch (error) {
    throw error
  }
}

const getBlogCategories = async (query?: any) => {
  try {
    const queries = { ...query }
    const exludeFields = ['page', 'limit', 'sort', 'fields']
    exludeFields.forEach((field) => {
      delete queries[field]
    })

    // Format queries object
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (matchEl) => `$${matchEl}`)
    const formattedQueries = JSON.parse(queryString)

    // Filtering
    if (queries?.title) {
      formattedQueries.title = { $regex: queries.title, $options: 'i' }
    }

    // BUILD QUERY COMMAND
    let queryCommand = BlogCategory.find(formattedQueries)

    // Sorting
    if (query?.sort) {
      const sortBy = query.sort.split(',').join(' ')
      queryCommand = queryCommand.sort(sortBy)
    }

    // Fields limiting
    if (query?.fields) {
      const fields = query.fields.split(',').join(' ')
      queryCommand = queryCommand.select(fields)
    }

    // Pagination
    const page = query.page ? Number(query.page) : 1
    const limit = query.limit ? Number(query.limit) : 1
    const skip = (page - 1) * limit
    queryCommand = queryCommand.limit(limit).skip(skip)

    // EXEC QUERY COMMAND
    const blogCategories = await queryCommand.exec()
    const count = blogCategories.length

    return {
      count,
      blogCategories
    }
  } catch (error) {
    throw error
  }
}

const blogCategoryService = {
  createBlogCategoryByAdmin,
  getBlogCategoryBySlug,
  getBlogCategories
}

export default blogCategoryService
