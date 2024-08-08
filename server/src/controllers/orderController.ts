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

const updateOrderStatus = async (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  const { orderId } = req.params
  const { status } = req.body
  try {
    const updatedOrder = await orderService.updateOrderStatus(orderId, status)
    return res.json(updatedOrder)
  } catch (error) {
    next(error)
  }
}

const orderController = {
  createOrder,
  updateOrderStatus
}

export default orderController
