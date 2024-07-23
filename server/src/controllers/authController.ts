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

const authController = {
  register
}

export default authController
