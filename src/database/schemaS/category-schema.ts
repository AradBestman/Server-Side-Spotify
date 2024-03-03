import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "songs" }],
});
export { categorySchema };
