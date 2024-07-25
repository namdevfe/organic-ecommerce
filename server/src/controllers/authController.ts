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

// Client send email field -> server check already user is exist
// Server: If email valid generate reset password token -> send email
// Client: click link to send token -> Server: check token has valid
// Server: token valid create new password
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

const authController = {
  register,
  login,
  logout,
  getProfile,
  refreshToken,
  forgotPassword,
  resetPassword
}

export default authController
