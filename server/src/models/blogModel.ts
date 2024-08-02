import mongoose, { model, Model } from 'mongoose'
import { AUTHOR_DEFAULT, COVER_IMAGE_BLOG_DEFAULT } from '~/constants/general'
import { IBlog } from '~/types/blog'

type BlogModel = Model<IBlog>

export const BLOG_MODEL_NAME = 'Blog'

const blogSchema = new mongoose.Schema<IBlog, BlogModel>({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  coverImage: {
    type: String,
    default: COVER_IMAGE_BLOG_DEFAULT
  },
  likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  author: {
    type: String,
    default: AUTHOR_DEFAULT
  }
})

const Blog: BlogModel = model<IBlog, BlogModel>(BLOG_MODEL_NAME, blogSchema)

export default Blog
