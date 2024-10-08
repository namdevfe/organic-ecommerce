/* eslint-disable no-useless-catch */

import { StatusCodes } from 'http-status-codes'
import Coupon from '~/models/couponModel'
import Order from '~/models/orderModel'
import User from '~/models/userModel'
import { IResponseReturn } from '~/types/common'
import { ORDER_STATUS } from '~/types/order'
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

const updateOrderStatus = async (orderId: string, status: ORDER_STATUS) => {
  try {
    const order = await Order.findById(orderId)
    if (!order) throw new ApiError(StatusCodes.NOT_FOUND, `Order id = ${orderId} not found.`)

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true })

    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: `Updaed status order id = ${orderId} is successfully.`,
      data: updatedOrder
    }
    return response
  } catch (error) {
    throw error
  }
}

const getOrderDetails = async (orderId: string) => {
  try {
    const orderDetails = await Order.findById(orderId)

    if (!orderDetails) throw new ApiError(StatusCodes.NOT_FOUND, `Order id = ${orderId} not found.`)

    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Get order details is successfully.',
      data: orderDetails
    }

    return response
  } catch (error) {
    throw error
  }
}

const getOrders = async () => {
  try {
    const orders = await Order.find()
    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Get orders is successfully.',
      data: orders
    }
    return response
  } catch (error) {
    throw error
  }
}

const orderService = {
  createOrder,
  updateOrderStatus,
  getOrderDetails,
  getOrders
}

export default orderService
