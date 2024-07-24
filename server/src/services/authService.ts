/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import env from '~/config/environments'
import { ACCESS_TOKEN_EXPIRES_TIME, REFRESH_TOKEN_EXPIRES_TIME } from '~/constants/jwt'
import { generateToken } from '~/middlewares/jwtMiddleware'
import User from '~/models/userModel'
import { ILoginBody, IRegisterBody } from '~/types/auth'
import ApiError from '~/utils/ApiError'
import jwt from 'jsonwebtoken'

const register = async (data: IRegisterBody) => {
  try {
    // Check email had existed
    const isHasAlreadyUser = await User.findOne({ email: data.email })

    if (isHasAlreadyUser) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'User is has already exist.')
    }

    // Create user
    const registeredUser = await User.create(data)

    // Return data
    if (registeredUser) {
      return {
        statusCode: StatusCodes.CREATED,
        message: 'User account has been registered successfully.'
      }
    }
  } catch (error) {
    throw error
  }
}

const login = async (data: ILoginBody) => {
  try {
    // Check user
    const isExistUser = await User.findOne({ email: data.email })
    if (!isExistUser) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found.')

    // Check password
    const isCheckedPassword = await isExistUser.isCorrectPassword(data.password)
    if (!isCheckedPassword) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Login failed. Please try again.')

    // Generate accessToken & refreshToken
    const accessToken: string = generateToken(
      { uid: isExistUser._id, role: isExistUser.role },
      env.JWT_SECRET_KEY,
      ACCESS_TOKEN_EXPIRES_TIME
    )
    const refreshToken: string = generateToken({ uid: isExistUser._id }, env.JWT_SECRET_KEY, REFRESH_TOKEN_EXPIRES_TIME)

    // Save refreshToken to db & cookies on server
    await User.findByIdAndUpdate({ _id: isExistUser._id }, { refreshToken }, { new: true })

    // Return data for client
    return {
      statusCode: StatusCodes.OK,
      message: 'Login is successfully.',
      data: {
        accessToken,
        refreshToken
      }
    }
  } catch (error) {
    throw error
  }
}

const getProfile = async (uid: string) => {
  try {
    const userData = await User.findById({ _id: uid }).select('-password -refreshToken -role')
    if (!userData) throw new ApiError(StatusCodes.NOT_FOUND, 'User profile not found.')
    return {
      statusCode: StatusCodes.OK,
      message: 'Get profile is successfully.',
      data: userData
    }
  } catch (error) {
    throw error
  }
}

const refreshToken = async (token: string) => {
  try {
    // Compare refresh token in db
    const user = await User.findOne({ refreshToken: token })

    // Refresh token wrong
    if (!user) throw new ApiError(StatusCodes.BAD_REQUEST, 'Refresh token invalid.')

    const decode = await jwt.verify(token, env.JWT_SECRET_KEY)

    if (decode) {
      const newAccessToken: string = generateToken(
        { uid: user._id, role: user.role },
        env.JWT_SECRET_KEY,
        ACCESS_TOKEN_EXPIRES_TIME
      )

      return {
        statusCode: StatusCodes.OK,
        message: 'Create new access token is successfully.',
        data: {
          accessToken: newAccessToken,
          refreshToken: token
        }
      }
    }
  } catch (error) {
    throw error
  }
}

const authService = {
  register,
  login,
  getProfile,
  refreshToken
}

export default authService
