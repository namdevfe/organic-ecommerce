import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ROLES } from '~/constants/role'
import { AuthRequestCustom, IJWTPayload } from '~/types/auth'
import ApiError from '~/utils/ApiError'

export const isAdmin = (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  try {
    const { role } = req.user as IJWTPayload
    if (role !== ROLES.ADMIN) throw new ApiError(StatusCodes.FORBIDDEN, 'Must be admin role.')
    next()
  } catch (error) {
    next(error)
  }
}
