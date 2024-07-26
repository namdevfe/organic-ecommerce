import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import authService from '~/services/authService'
import { AuthRequestCustom, IForgotPasswordBody, IJWTPayload, ILogoutBody, IRefreshTokenBody } from '~/types/auth'

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const registeredUser = await authService.register(req.body)
    return res.json(registeredUser)
  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginRes = await authService.login(req.body)
    return res.json(loginRes)
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  const user = req.user as IJWTPayload
  try {
    const userData = await authService.getProfile(user.uid)
    return res.json(userData)
  } catch (error) {
    next(error)
  }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body as IRefreshTokenBody
  try {
    const data = await authService.refreshToken(refreshToken)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await authService.logout(req.body as ILogoutBody)
    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body as IForgotPasswordBody
  try {
    const response = await authService.forgotPassword(email)

    return res.json({
      statusCode: StatusCodes.OK,
      message: 'OK',
      data: response
    })
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await authService.resetPassword(req.body)
    return res.json(response)
  } catch (error) {
    next(error)
  }
}

const updateProfile = async (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  const { uid } = req.user as IJWTPayload
  try {
    const userUpdated = await authService.updateProfile(uid, req.body)
    return res.json({ userUpdated })
  } catch (error) {
    next(error)
  }
}

// ADMIN
const getListUsersByAdmin = async (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  try {
    const users = await authService.getListUsersByAdmin()
    return res.json({
      statusCode: StatusCodes.OK,
      message: 'Get list user is successfully.',
      data: users
    })
  } catch (error) {
    next(error)
  }
}

const authController = {
  register,
  login,
  logout,
  getProfile,
  refreshToken,
  forgotPassword,
  resetPassword,
  updateProfile,
  getListUsersByAdmin
}

export default authController
