import mongoose from 'mongoose';

const db = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/merndb");
    console.log("Connected to Database 🙆");
  } catch (error) {
    console.error(error);
  }
}

export default db;