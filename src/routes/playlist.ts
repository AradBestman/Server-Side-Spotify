import { IPlaylist } from "./../@types/playlist.d";
import { Router } from "express";
import { validateToken } from "../middleWare/validate-token";
import { Playlist } from "../database/models/playlist-model";
import { nextTick } from "process";
import { valid } from "joi";
import mongoose from "mongoose";

const router = Router();

router.post("/", validateToken, async (req, res) => {
  try {
    // Extract playlist data from the request body
    const { name, desc, songs, img } = req.body;
    const userId = req.user?._id;
    // Create a new playlist object
    const newPlaylist = new Playlist({
      name,
      desc,
      songs,
      img,
      userId,
    });

    // Save the playlist to the database
    const savedPlaylist = await newPlaylist.save();

    // Return success response
    res.status(201).json(savedPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// add song to playlist//
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const playlistId = req.params.id;
    const { song } = req.body;
    console.log(playlistId);

    // Find the playlist by ID
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Add the song to the playlist
    let newPlaylist = [song, ...playlist.songs];

    // Save the updated playlist to the database
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      { _id: playlistId },
      { songs: newPlaylist },
      { new: true }
    );

    // Return success response with the updated playlist
    res.json(updatedPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get All Playlists From The Database///
router.get("/", validateToken, async (req, res) => {
  try {
    // Extract query parameters from the request

    // Query playlists from the database based on the filter
    const playlists = await Playlist.find();
    console.log(req.user);

    // Return the playlists as JSON response
    return res.status(200).json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const playlistWithSongs = await Playlist.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }, // Match the playlist by ID
      },
      {
        $lookup: {
          from: "songs", // Name of the Song collection
          localField: "songs", // Field in the Playlist collection
          foreignField: "_id", // Field in the Song collection
          as: "songs", // Name of the field to store the joined songs
        },
      },
    ]);
    res.json(playlistWithSongs[0]);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as playlistRouter };
