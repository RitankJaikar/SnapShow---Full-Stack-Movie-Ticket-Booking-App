import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    )
    await mongoose.connect(`${process.env.MONGODB_URI}/snapshow`)
  } catch (error) {
    console.log(error.message)
    process.exit(1) // ❌ Hard exit to avoid running a broken server
  }
}

export default connectDB;