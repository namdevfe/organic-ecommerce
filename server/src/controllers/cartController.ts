import { NextFunction, Response } from 'express'
import cartService from '~/services/cartService'
import { AuthRequestCustom, IJWTPayload } from '~/types/auth'

const addToCart = async (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  const { uid } = req.user as IJWTPayload

  try {
    const cart = await cartService.addToCart(uid, req.body)
    return res.json({ cart })
  } catch (error) {
    next(error)
  }
}

// Get cart details
const getCart = async (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  const { uid } = req.user as IJWTPayload
  try {
    const cart = await cartService.getCart(uid)
    return res.json(cart)
  } catch (error) {
    next(error)
  }
}

const cartController = {
  addToCart,
  getCart
}

export default cartController
