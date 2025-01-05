import { User } from "../models/user.model.js";

const searchUser = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(200).json(user.toObject());
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error searching for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { searchUser };