import { NextFunction, Request, Response } from 'express'
import authService from '~/services/authService'
import { AuthRequestCustom, IJWTPayload } from '~/types/auth'

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

const authController = {
  register,
  login,
  getProfile
}

export default authController
