import mongoose, { InferSchemaType } from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { PRODUCT_COLLECTION_NAME } from '~/models/productModel'

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    cart: [
      {
        product: { type: mongoose.Types.ObjectId, ref: PRODUCT_COLLECTION_NAME },
        buyQuantity: { type: Number }
      }
    ],
    address: {
      type: String
    },
    wishList: [{ type: mongoose.Types.ObjectId, ref: PRODUCT_COLLECTION_NAME }],
    isActived: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      default: 'User'
    },
    avatar: {
      type: String
    },
    refreshToken: {
      type: String
    },
    passwordChangedAt: {
      type: String
    },
    passwordResetToken: {
      type: String
    },
    passwordResetExpires: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  // Hash password
  const salt = bcrypt.genSaltSync(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods = {
  isCorrectPassword: async function (password: string) {
    return await bcrypt.compare(password, this.password)
  },
  generateResetPasswordToken: function () {
    const resetPasswordToken = crypto.randomBytes(32).toString('hex')
    // Hash reset password token
    this.passwordResetToken = crypto.createHash('SHA256').update(resetPasswordToken).digest('hex')
    return resetPasswordToken
  }
}

//Export the model
const User = mongoose.model<IUser>('User', userSchema)

interface IUser extends InferSchemaType<typeof userSchema> {
  // eslint-disable-next-line no-unused-vars
  isCorrectPassword(password: string): Promise<boolean>
  generateResetPasswordToken(): string
}

export default User
