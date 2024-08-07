import mongoose from 'mongoose'

export interface ICoupon {
  name: string
  expiredTime: Date
  discount: number
}

export interface IUpdateCoupon extends ICoupon {
  couponId: mongoose.Types.ObjectId
}

export type DeleteCouponType = Pick<IUpdateCoupon, 'couponId'>
