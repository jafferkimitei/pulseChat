import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Room from "../models/roomModel.js";
import Avatar from "../models/avatarModel.js";
import Message from '../models/MessageModel.js';

const rooms = await Room.find();
const users = await User.find();

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    
    await User.deleteMany();
    await Room.deleteMany();
    await Avatar.deleteMany();

    
    const createdUsers = await User.insertMany([
      { name: "MelodyMike", email: "mike@music.com", password: "123456" },
      { name: "GamerGal", email: "gamer@game.com", password: "123456" },
      { name: "LoveBird", email: "love@date.com", password: "123456" },
    ]);

    await Room.insertMany([
      {
        name: "🎵 Music Talk",
        category: "music",
        users: [createdUsers[0]._id],
      },
      {
        name: "🎮 Gaming Central",
        category: "gaming",
        users: [createdUsers[1]._id],
      },
      {
        name: "❤️ Dating & Relationships",
        category: "dating",
        users: [createdUsers[2]._id],
      },
    ]);

    
    await Avatar.insertMany([
      {
        name: "Cool Cat",
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=CoolCat",
      },
      {
        name: "Funky Monkey",
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=FunkyMonkey",
      },
      {
        name: "Chill Panda",
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChillPanda",
      },
      {
        name: "Happy Tiger",
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=HappyTiger",
      },
      {
        name: "Witty Fox",
        url: "https://api.dicebear.com/7.x/avataaars/svg?seed=WittyFox",
      },
    ]);

    await Message.insertMany([
      { text: 'Hello from Mike!', user: users[0]._id, roomId: rooms[0]._id },
      { text: 'Hey Mike!',      user: users[1]._id, roomId: rooms[0]._id },
      
    ]);

    console.log("Seeding complete!");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed error:", error.message);
    await mongoose.disconnect();
  }
};

seedData();
