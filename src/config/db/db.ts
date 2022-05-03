import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    if (process.env.MONGO_URI) {
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.info(`MongoDB connected: ${conn.connection.host}`)
    } else {
      throw Error('NO MONGO URI')
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
