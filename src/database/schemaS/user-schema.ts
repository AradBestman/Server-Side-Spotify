import { date } from "joi";
import { IUser } from "../../@types/user";
import { Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  month: { type: String, required: true },
  date: { type: String, required: true },
  year: { type: String, required: true },
  likedSongs: { type: [String], default: [] },
  playlists: { type: [String], default: [] },
  isAdmin: { type: Boolean, default: false },
});

export default userSchema;
