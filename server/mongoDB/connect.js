import mongoose from "mongoose";

const connectDb = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => {
      console.log("mongo connected");
    })
    .catch((error) => console.log(error));
};

export default connectDb;
