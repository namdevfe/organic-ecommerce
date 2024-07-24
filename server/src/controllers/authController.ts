import { NextFunction, Request, Response } from 'express'
import authService from '~/services/authService'

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

const authController = {
  register,
  login
}

export default authController
