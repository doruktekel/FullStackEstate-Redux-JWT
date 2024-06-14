import mongoose from "mongoose";

const connectionDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connection was succesfully :)");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectionDb;
