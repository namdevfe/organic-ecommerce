import { NextFunction, Request, Response } from 'express'
import authService from '~/services/authService'
import { AuthRequestCustom, IJWTPayload, ILogoutBody, IRefreshTokenBody } from '~/types/auth'

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

const authController = {
  register,
  login,
  logout,
  getProfile,
  refreshToken
}

export default authController
