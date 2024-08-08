/* eslint-disable no-unused-vars */
import mongoose from 'mongoose'
import { IAddToCart } from '~/types/cart'

export interface IOrder {
  products: IAddToCart[]
  totalPrice: number
  orderBy?: mongoose.Types.ObjectId | string
  coupon?: mongoose.Types.ObjectId | string
  status: string
}

export enum ORDER_STATUS {
  Cancelled = 'Cancelled',
  Processing = 'Processing',
  Succeed = 'Succeed'
}
