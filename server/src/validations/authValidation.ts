import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import {
  IDeleteUserByAdmin,
  IForgotPasswordBody,
  ILoginBody,
  ILogoutBody,
  IRefreshTokenBody,
  IRegisterBody,
  IResetPasswordBody,
  IUpdateProfile,
  IUpdateUserByAdmin
} from '~/types/auth'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const register = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IRegisterBody>({
    firstName: Joi.string().required().trim().strict(),
    lastName: Joi.string().required().trim().strict(),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 1, tlds: { allow: ['com'] } })
      .trim()
      .strict(),
    username: Joi.string().required().min(3).trim().strict(),
    password: Joi.string().required().trim().strict(),
    phone: Joi.string().required().length(10).trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<ILoginBody>({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 1, tlds: { allow: ['com'] } })
      .trim()
      .strict(),
    password: Joi.string().required().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<ILogoutBody>({
    refreshToken: Joi.string().required().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IRefreshTokenBody>({
    refreshToken: Joi.string().required().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IForgotPasswordBody>({
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 1, tlds: { allow: ['com'] } })
      .trim()
      .strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IResetPasswordBody>({
    password: Joi.string().required().trim().strict(),
    resetPasswordToken: Joi.string().required().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IUpdateProfile>({
    firstName: Joi.string().trim().strict(),
    lastName: Joi.string().trim().strict(),
    address: Joi.string().trim().strict(),
    username: Joi.string().trim().strict(),
    avatar: Joi.string().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

// ADMIN
const updateUserByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IUpdateUserByAdmin>({
    firstName: Joi.string().trim().strict(),
    lastName: Joi.string().trim().strict(),
    address: Joi.string().trim().strict(),
    avatar: Joi.string().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
  }
}

const deleteUserByAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const correctCondition = Joi.object<IDeleteUserByAdmin>({
    uid: Joi.string().required().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.params, { abortEarly: false })
    next()
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
    }
  }
}

const authValidation = {
  register,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  updateProfile,
  updateUserByAdmin,
  deleteUserByAdmin
}

export default authValidation
