import mongoose, { model, Model } from 'mongoose'
import { IProductCategory } from '~/types/productCategory'

type ProductCategoryModel = Model<IProductCategory>

const productCategorySchema = new mongoose.Schema<IProductCategory, ProductCategoryModel>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const ProductCategory: ProductCategoryModel = model<IProductCategory, ProductCategoryModel>(
  'ProductCategory',
  productCategorySchema
)

export default ProductCategory
