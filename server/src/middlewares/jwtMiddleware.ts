import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import env from '~/config/environments'
import { AuthRequestCustom } from '~/types/auth'
import ApiError from '~/utils/ApiError'

export const generateToken = (payload = {}, secretKey: string, expiresTime: string) => {
  return jwt.sign(payload, secretKey, { expiresIn: expiresTime })
}

export const verifyToken = (req: AuthRequestCustom, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization?.startsWith('Bearer')) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token is required.')
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token is required.')
    }

    jwt.verify(token, env.JWT_SECRET_KEY, (error, decode) => {
      if (error) {
        const isTokenExpired = error instanceof TokenExpiredError
        if (isTokenExpired) {
          throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token is expired.')
        } else {
          throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token invalid.')
        }
      }

      req.user = decode
      next()
    })
  } catch (error) {
    next(error)
  }
}
