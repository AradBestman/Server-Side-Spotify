// models/song-model.ts

import mongoose, { Model } from "mongoose";
import songSchema from "../schemaS/song-schema"; // Assuming your schemas are in schemas folder

const Song = mongoose.model("songs", songSchema);
export { Song };
