import { StatusCodes } from 'http-status-codes'
import BlogCategory from '~/models/blogCategoryModel'
import { IBlogCategory } from '~/types/blogCategory'
import ApiError from '~/utils/ApiError'
import slugify from '~/utils/slugify'

/* eslint-disable no-useless-catch */
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

const blogCategoryService = {
  createBlogCategoryByAdmin
}

export default blogCategoryService
