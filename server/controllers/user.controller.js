import User from "../mongoDB/models/user.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).limit(req.query._end);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) return res.status(200).json(userExist);

    const newUser = await User.create({
      name,
      email,
      avatar,
    });

    res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const getUserInfoById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }).populate("allProperties");

    if (user) res.status(200).json(user);
    if (!user) res.status(400).json({ message: "user not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, createUser, getUserInfoById };
