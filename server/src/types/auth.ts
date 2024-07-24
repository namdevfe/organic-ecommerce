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
