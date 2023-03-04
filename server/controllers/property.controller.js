import mongoose from "mongoose";
import Propterty from "../mongoDB/models/property.js";
import User from "../mongoDB/models/user.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    propertyType = "",
  } = req.query;
  const query = {};
  if (propertyType) {
    query.propertyType = propertyType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }
  try {
    const count = await Propterty.countDocuments({ query });
    const properties = await Propterty.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProperyDetail = async (req, res) => {
  const { id } = req.params;
  const propertyExist = await Propterty.findOne({ _id: id }).populate(
    "creator"
  );
  if (propertyExist) {
    res.status(200).json(propertyExist);
  } else {
    res.status(404).json({ message: "property not found" });
  }
};
const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    // start a new session
    // what happin in this functionis atomic, it can either work or not and we will not get stuck in between
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("user not found please try again.");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Propterty.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });
    await session.commitTransaction();
    res.status(200).json({ message: "Property created successfully" });
  } catch (error) {
    res.status(500).json({ message: "somethign went wrong" });
  }
};
const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyToDelete = await Propterty.findById({ _id: id }).populate(
      "creator"
    );

    if (!propertyToDelete) {
      throw new Error("not found ");
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();

      propertyToDelete.remove({ session });
      propertyToDelete.creator.allProperties.pull(propertyToDelete);

      await propertyToDelete.creator.save({ session });
      await session.commitTransaction();
      res.status(200), json({ message: "property deleted sucessfully" });
    }
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllProperties,
  getProperyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
