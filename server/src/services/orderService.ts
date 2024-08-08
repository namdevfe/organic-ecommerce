/* eslint-disable no-useless-catch */

import { StatusCodes } from 'http-status-codes'
import Coupon from '~/models/couponModel'
import Order from '~/models/orderModel'
import User from '~/models/userModel'
import { IResponseReturn } from '~/types/common'
import ApiError from '~/utils/ApiError'

const createOrder = async (uid: string, coupon?: string) => {
  try {
    // Find user cart
    const user = await User.findById(uid).select('cart').populate('cart.product', 'title slug price')
    if (user?.cart.length === 0) throw new ApiError(StatusCodes.NOT_FOUND, 'There are no product in cart.')

    // Products
    const products = user?.cart.map((item) => ({
      product: item.product,
      buyQuantity: item.buyQuantity
    }))

    // Calculate totalPrice
    let totalPrice = products?.reduce((sum, item) => item.product?.price * item.buyQuantity + sum, 0) || 0

    if (coupon) {
      // Find coupon
      const selectedCoupon = await Coupon.findById(coupon)

      if (selectedCoupon) {
        const isExpiredTime = await Coupon.findOne({ expiredTime: { $lt: Date.now() } })
        if (isExpiredTime) throw new ApiError(StatusCodes.BAD_REQUEST, 'Coupon had expired.')
        totalPrice = Math.round((totalPrice * (1 - selectedCoupon.discount / 100)) / 1000) * 1000
      }
    }

    const createdOrder = await Order.create({ products, totalPrice, orderBy: uid, coupon })

    // Delete cart if order success
    createdOrder && (await User.findByIdAndUpdate(uid, { cart: [] }, { new: true }))

    const response: IResponseReturn = {
      statusCode: StatusCodes.CREATED,
      message: 'Created order is successfully.',
      data: createdOrder
    }
    return response
  } catch (error) {
    throw error
  }
}

const orderService = {
  createOrder
}

export default orderService
