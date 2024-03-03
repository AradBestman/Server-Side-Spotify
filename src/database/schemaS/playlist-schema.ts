import mongoose, { Schema } from "mongoose";
import { IPlaylist } from "../../@types/playlist";
import { string } from "joi";

const playlistSchema = new Schema<IPlaylist>({
  name: { type: String, required: true },
  desc: { type: String },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }], // Assuming "Song" is your song model
  img: { type: String, required: true }, // Assuming img is required
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category_id: { type: String }, // Assuming userId is required and references User model
});

export { playlistSchema };
