/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import { IRegisterBody } from '~/types/auth'
import ApiError from '~/utils/ApiError'

const register = async (data: IRegisterBody) => {
  try {
    // Check email had existed
    const isHasAlreadyUser = await User.findOne({ email: data.email })

    if (isHasAlreadyUser) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'User is has already exist.')
    }

    // Create user
    const registeredUser = await User.create(data)

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, role, ...userData } = registeredUser.toObject()

    // Return data
    return {
      statusCode: StatusCodes.CREATED,
      message: 'User account has been registered successfully.',
      data: userData
    }
  } catch (error) {
    throw error
  }
}

const authService = {
  register
}

export default authService
