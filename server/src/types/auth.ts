import { Request } from 'express'

export interface IRegisterBody {
  firstName: string
  lastName: string
  email: string
  password: string
  username: string
  phone: string
}

export interface ILoginBody {
  email: string
  password: string
}

export interface AuthRequestCustom extends Request {
  user?: unknown
}

export interface IJWTPayload {
  uid: string
  role: string
  iat: Date
  exp: Date
}

export interface IRefreshTokenBody {
  refreshToken: string
}

export interface ILogoutBody extends IRefreshTokenBody {}

export interface IForgotPasswordBody {
  email: string
}

export interface IResetPasswordBody {
  password: string
  resetPasswordToken: string
}

export interface IUpdateProfile {
  firstName?: string
  lastName?: string
  address?: string
  avatar?: string
  username?: string
}

export interface IUpdateUserByAdmin extends IUpdateProfile {}

export interface IDeleteUserByAdmin {
  uid: string
}
