import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import env from '~/config/environments'
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary'

declare interface CloudinaryOptions extends Options {
  params: {
    folder: string
  }
}

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_SECRET_KEY
})

const multerOptions: CloudinaryOptions = {
  cloudinary,
  params: {
    folder: 'organic-ecommerce'
  }
}

const storage = new CloudinaryStorage(multerOptions)

const upload = multer({ storage })

export default upload
