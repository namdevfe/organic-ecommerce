import mongoose, { model, Model } from 'mongoose'
import { IBlogCategory } from '~/types/blogCategory'

type BlogCategoryModel = Model<IBlogCategory>

const blogCategorySchema = new mongoose.Schema<IBlogCategory, BlogCategoryModel>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const BlogCategory: BlogCategoryModel = model<IBlogCategory, BlogCategoryModel>('BlogCategory', blogCategorySchema)

export default BlogCategory
