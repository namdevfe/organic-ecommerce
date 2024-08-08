import { NextFunction, Response } from 'express'
import orderService from '~/services/orderService'
import { AuthRequestCustom, IJWTPayload } from '~/types/auth'

const createOrder = async (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  const { uid } = req.user as IJWTPayload
  const { coupon } = req.body
  try {
    const createdOrder = await orderService.createOrder(uid, coupon)
    return res.json(createdOrder)
  } catch (error) {
    next(error)
  }
}

const orderController = {
  createOrder
}

export default orderController
