import mongoose, { Model } from 'mongoose'
import { COUPON_COLLECTION_NAME } from '~/models/couponModel'
import { PRODUCT_COLLECTION_NAME } from '~/models/productModel'
import { USER_COLLECTION_NAME } from '~/models/userModel'
import { IOrder } from '~/types/order'

type OrderModel = Model<IOrder>

export const ORDER_COLLECTION_NAME = 'Order'

const orderSchema = new mongoose.Schema<IOrder, OrderModel>({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: PRODUCT_COLLECTION_NAME },
      buyQuantity: { type: Number }
    }
  ],
  totalPrice: { type: Number, default: 0 },
  orderBy: { type: mongoose.Types.ObjectId, ref: USER_COLLECTION_NAME },
  coupon: { type: mongoose.Types.ObjectId, ref: COUPON_COLLECTION_NAME },
  status: {
    type: String,
    enum: ['Cancelled', 'Processing', 'Succeed'],
    default: 'Processing'
  }
})

const Order: OrderModel = mongoose.model<IOrder, OrderModel>(ORDER_COLLECTION_NAME, orderSchema)

export default Order
