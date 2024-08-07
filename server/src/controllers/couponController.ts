import { NextFunction, Request, Response } from 'express'
import couponService from '~/services/couponService'

const createCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdCoupon = await couponService.createCoupon(req.body)
    return res.json(createdCoupon)
  } catch (error) {
    next(error)
  }
}

const getCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  try {
    const coupon = await couponService.getCoupon(name)
    return res.json(coupon)
  } catch (error) {
    next(error)
  }
}

const couponController = {
  createCoupon,
  getCoupon
}

export default couponController
