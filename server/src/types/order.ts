import mongoose from 'mongoose'
import { IAddToCart } from '~/types/cart'

export interface IOrder {
  products: IAddToCart[]
  totalPrice: number
  orderBy?: mongoose.Types.ObjectId | string
  coupon?: mongoose.Types.ObjectId | string
  status: string
}
