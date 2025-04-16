import mongoose from "mongoose";
import dotenv from "dotenv";
import Avatar from "../models/avatarModel.js";

dotenv.config();

const avatars = [
    {
        name: 'Cool Cat',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CoolCat'
      },
      {
        name: 'Funky Monkey',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FunkyMonkey'
      },
      {
        name: 'Chill Panda',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChillPanda'
      },
      {
        name: 'Happy Tiger',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HappyTiger'
      },
      {
        name: 'Witty Fox',
        url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WittyFox'
      },
];

const seedAvatars = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Avatar.deleteMany({});
        await Avatar.insertMany(avatars);
        console.log("Avatars seeded successfully");
        await mongoose.disconnect();
    } catch (error) {
        console.error("Error seeding avatars:", error);
        await mongoose.disconnect();
    }
};

seedAvatars();