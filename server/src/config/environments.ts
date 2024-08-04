import 'dotenv/config'

const env = {
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: Number(process.env.APP_PORT) || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
  EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD,
  EMAIL_ACCOUNT: process.env.EMAIL_ACCOUNT,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY
}

export default env
