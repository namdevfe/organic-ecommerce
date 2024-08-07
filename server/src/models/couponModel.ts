import mongoose, { Model } from 'mongoose'
import { ICoupon } from '~/types/coupon'

type CouponModel = Model<ICoupon>

export const COUPON_COLLECTION_NAME = 'Coupon'

const couponSchema = new mongoose.Schema<ICoupon, CouponModel>(
  {
    name: { type: String, required: true, unique: true },
    expiredTime: { type: Date, required: true },
    discount: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const Coupon: CouponModel = mongoose.model<ICoupon, CouponModel>(COUPON_COLLECTION_NAME, couponSchema)

export default Coupon
