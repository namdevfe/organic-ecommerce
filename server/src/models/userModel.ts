import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
    cart: {
      type: Array,
      default: []
    },
    address: {
      type: String
    },
    wishList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
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

//Export the model
const User = mongoose.model('User', userSchema)

export default User
