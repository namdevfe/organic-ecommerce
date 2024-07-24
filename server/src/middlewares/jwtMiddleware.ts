import jwt from 'jsonwebtoken'

export const generateToken = (payload = {}, secretKey: string, expiresTime: string) => {
  return jwt.sign(payload, secretKey, { expiresIn: expiresTime })
}
