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

const getCoupons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coupons = await couponService.getCoupons()
    return res.json(coupons)
  } catch (error) {
    next(error)
  }
}

const updateCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const { couponId } = req.params
  try {
    const updatedCoupon = await couponService.updateCoupon(couponId, req.body)
    return res.json(updatedCoupon)
  } catch (error) {
    next(error)
  }
}

const deleteCoupon = async (req: Request, res: Response, next: NextFunction) => {
  const { couponId } = req.params
  try {
    const deletedCoupon = await couponService.deleteCoupon(couponId)
    return res.json(deletedCoupon)
  } catch (error) {
    next(error)
  }
}

const couponController = {
  createCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon
}

export default couponController
