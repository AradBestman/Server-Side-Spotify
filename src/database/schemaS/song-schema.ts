// schemas/song-schema.ts

import { Schema } from "mongoose";
import { ISong } from "../../@types/song";
import { required } from "joi";

const songSchema = new Schema<ISong>({
  originalname: { type: String, required: true },
  destination: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  userId: { type: String, required: true },
  bitrate: { type: Number, required: true },
  duration: { type: Number, required: true },
});

export default songSchema;
