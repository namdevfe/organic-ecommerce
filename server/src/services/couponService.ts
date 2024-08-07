/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import Coupon from '~/models/couponModel'
import { IResponseReturn } from '~/types/common'
import ApiError from '~/utils/ApiError'

const createCoupon = async (data: { name: string; expiredTime: number }) => {
  const { name, expiredTime } = data || {}
  try {
    const coupon = await Coupon.findOne({ name })
    if (coupon) throw new ApiError(StatusCodes.BAD_REQUEST, `Coupon name = ${name} had already exist.`)
    // Uppercase name coupon
    const uppercaseCouponName = name.toUpperCase()

    // Calculate expired time
    const expiredTimeModify = Date.now() + Number(expiredTime * 24 * 60 * 60 * 1000)

    const createdCoupon = await Coupon.create({ name: uppercaseCouponName, expiredTime: expiredTimeModify })

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

const couponService = {
  createCoupon
}

export default couponService
