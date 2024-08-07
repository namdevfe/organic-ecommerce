/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import Coupon from '~/models/couponModel'
import { IResponseReturn } from '~/types/common'
import ApiError from '~/utils/ApiError'

const createCoupon = async (data: { name: string; expiredTime: number; discount: number }) => {
  const { name, expiredTime, discount } = data || {}
  try {
    const coupon = await Coupon.findOne({ name })
    if (coupon) throw new ApiError(StatusCodes.BAD_REQUEST, `Coupon name = ${name} had already exist.`)
    // Uppercase name coupon
    const uppercaseCouponName = name.toUpperCase()

    // Calculate expired time
    const expiredTimeModify = Date.now() + Number(expiredTime * 24 * 60 * 60 * 1000)

    const createdCoupon = await Coupon.create({ name: uppercaseCouponName, expiredTime: expiredTimeModify, discount })

    const response: IResponseReturn = {
      statusCode: StatusCodes.CREATED,
      message: 'Created new coupon is successfully.',
      data: createdCoupon
    }

    return response
  } catch (error) {
    throw error
  }
}

const getCoupon = async (name: string) => {
  try {
    const coupon = await Coupon.findOne({ name: name.toUpperCase() })
    if (!coupon) throw new ApiError(StatusCodes.NOT_FOUND, `Coupon name = ${name} not found.`)
    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Get coupon details is successfully.',
      data: coupon
    }
    return response
  } catch (error) {
    throw error
  }
}

const getCoupons = async () => {
  try {
    const coupons = await Coupon.find()
    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Get list coupons is successfully.',
      data: coupons
    }
    return response
  } catch (error) {
    throw error
  }
}

const couponService = {
  createCoupon,
  getCoupon,
  getCoupons
}

export default couponService
