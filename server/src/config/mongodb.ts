/* eslint-disable no-console */
import mongoose from 'mongoose'
import env from '~/config/environments'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI as string)
    if (conn.connection.readyState === 1) {
      console.log('Database connection is successfully...')
    } else {
      console.log('Database connection is failed...')
    }
  } catch (error) {
    console.log('🚀error---->', error)
  }
}

export default connectDB
