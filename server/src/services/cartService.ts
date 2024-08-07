/* eslint-disable no-useless-catch */

import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import { IAddToCart } from '~/types/cart'
import { IResponseReturn } from '~/types/common'
import ApiError from '~/utils/ApiError'

// Add To Cart
const addToCart = async (uid: string, data: IAddToCart) => {
  const { product, buyQuantity } = data || {}
  try {
    // Find user
    const user = await User.findById(uid)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.')

    // Add product to user cart
    const alreadyProduct = user.cart.find((item) => item?.product?.toString() === product)

    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Add to cart is successfully.'
    }

    if (alreadyProduct) {
      // Update quantity
      const updatedCart = await User.updateOne(
        { cart: { $elemMatch: alreadyProduct } },
        { $set: { 'cart.$.buyQuantity': buyQuantity } },
        { new: true }
      )
      response.data = updatedCart
    } else {
      // Add new product
      const updatedCart = await User.findByIdAndUpdate(
        uid,
        { $push: { cart: { product, buyQuantity } } },
        { new: true }
      )
      response.data = updatedCart
    }
    return response
  } catch (error) {
    throw error
  }
}

// Get cart details
const getCart = async (uid: string) => {
  try {
    const cart = await User.findById(uid).select('cart')
    const response: IResponseReturn = {
      statusCode: StatusCodes.OK,
      message: 'Get cart is successfully.',
      data: cart
    }
    return response
  } catch (error) {
    throw error
  }
}

const cartService = {
  addToCart,
  getCart
}

export default cartService
