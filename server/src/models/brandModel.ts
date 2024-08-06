import mongoose, { Model } from 'mongoose'
import { IBrand } from '~/types/brand'

type BrandModel = Model<IBrand>

export const BRAND_COLLECTION_NAME = 'Brand'

const brandSchema = new mongoose.Schema<IBrand, BrandModel>(
  {
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
    image: {
      type: String
    },
    imageFileName: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Brand: BrandModel = mongoose.model<IBrand, BrandModel>(BRAND_COLLECTION_NAME, brandSchema)

export default Brand
