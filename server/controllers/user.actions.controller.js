import { User } from "../models/user.model.js";
import ChatRoom from "../models/chat.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";

/**
 * Controller to search for a user by username.
 */
const searchUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.find({ username }).select(
      "_id username profileImage"
    );
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error searching for user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller to send message.
 */
const sendMessage = async (req, res) => {
  try {
    const { toUserid, fromUserid, message } = req.body;

    if (!toUserid || !fromUserid || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a chat room between the two users already exists
    let chat = await ChatRoom.findOne({
      participants: { $all: [toUserid, fromUserid] },
    });

    // Create a new chat room if none exists
    if (!chat) {
      chat = await ChatRoom.create({
        name: `${toUserid}-${fromUserid}`,
        participants: [toUserid, fromUserid],
      });
    }

    // Create and save the new message
    const newMessage = await Message.create({
      chatRoom: chat._id,
      sender: fromUserid,
      content: message,
    });

    // Update the chat room's lastMessage field
    chat.lastMessage = newMessage._id;
    await chat.save();

    // Send the response back to the client
    return res.status(201).json({
      message: "Message sent successfully",
      chatRoom: chat,
      newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller to send message.
 */
const getMessages = async (req, res) => {
  const { userId1, userId2 } = req.body;

  try {
    const chatRoom = await ChatRoom.findOne({
      participants: {
        $all: [
          new mongoose.Types.ObjectId(userId1),
          new mongoose.Types.ObjectId(userId2),
        ],
      },
    })
      .populate("participants", "username profileImage")
      .populate("lastMessage");

    if (!chatRoom) {
      return res.status(404).json({ message: "Chat room not found" });
    }

    const messages = await Message.find({
      chatRoom: chatRoom._id,
      sender: {
        $in: [
          new mongoose.Types.ObjectId(userId1),
          new mongoose.Types.ObjectId(userId2),
        ],
      },
    })
      .populate("sender", "username profileImage")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { searchUser, sendMessage, getMessages };
