import mongoose, { model, Model } from 'mongoose'
import { IProduct } from '~/types/product'

type ProductModel = Model<IProduct>

export const PRODUCT_COLLECTION_NAME = 'Product'

const productSchema = new mongoose.Schema<IProduct, ProductModel>(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'ProductCategory' },
    images: [String],
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
        comment: { type: String }
      }
    ],
    totalRatings: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

const Product: ProductModel = model<IProduct, ProductModel>(PRODUCT_COLLECTION_NAME, productSchema)

export default Product
