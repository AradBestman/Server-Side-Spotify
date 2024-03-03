import mongoose from "mongoose";
import { playlistSchema } from "../schemaS/playlist-schema";
const Playlist = mongoose.model("playlists", playlistSchema);

export { Playlist };
