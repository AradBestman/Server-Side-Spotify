import { Router } from "express";
import { ISong } from "../@types/song";
import { Logger } from "../logs/logger";
import { createSong } from "../service/song-service";
import { Song } from "../database/models/song-model";
import { songUploadMiddleware } from "../middleWare/audio-Upload";
import path from "path";
import { extractToken, isAdmin } from "../middleWare/isAdmin-check";
import { auth } from "../service/auth-service";
import { User } from "../database/models/user-model";
import { validateToken } from "../middleWare/validate-token";
import { Playlist } from "../database/models/playlist-model";
import { SongsError } from "../error/song-error";
import { Category } from "../database/models/category-model";

const router = Router();

router.post("/", songUploadMiddleware, validateToken, async (req, res) => {
  try {
    console.log("Request Headers:", req.headers);
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    // Destructure the necessary properties from req.file using optional chaining
    const { originalname, destination, size, path, userId } = req.file as ISong;
    const { categoryId } = req.body;

    // Other form fields
    // const { name, artist, img, duration } = req.body;
    // Create a new song instance
    const newSong = new Song({
      originalname: originalname,
      destination: destination,
      size: size,
      userId: req.user?.id,
      path: path,
    });
    console.log("this is arad logg ", req.user);

    const savedSong = await newSong.save();

    // Associate the song with the specified category
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      category.songs.push(savedSong._id);
      await category.save();
    }

    res.status(201).json(savedSong);
  } catch (error) {
    console.error(error);
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
});
//All of the Songs
router.get("/", validateToken, async (req, res, next) => {
  try {
    const songs = await Song.find();
    console.log(req.user);

    return res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
});

// router.get("/", validateToken, async (req, res) => {
//   const { category, playlistId } = req.params;
//   const filter = category ? { category } : {};
//   let songs;
//   if (playlistId) {
//     const playlist = await Playlist.findbyId(playlistId);

//     // return only songs in specified playlist
//     // optionall filter by category
//   } else {
//     songs = await Song.find(filter);
//   }
// });

router.patch("/like", async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    //get user from database
    const user = await User.findOne({ email });
    if (user) {
      let likes = user.likedSongs || []; // Ensure likes is an array
      console.log("this is arad logg ", user.email); // Changed from user?.email

      const indexId = likes.indexOf(req.body.song_id);
      if (indexId === -1) {
        likes.push(req.body.song_id);
      } else {
        likes.splice(indexId, 1);
      }
      const setLike = await User.findByIdAndUpdate(
        user._id, // Removed unnecessary braces
        { likedSongs: likes },
        { new: true }
      );
      return res.status(200).json(setLike);
    } else {
      throw new SongsError("User does not exist", 401);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/:id/songs", async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming you have a Song model with a reference to Playlist model
    const songs = await Song.find({ playlist: id });

    res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching playlist songs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/library", validateToken, async (req, res, next) => {
  const likedSongs = await Song.find({
    _id: { $in: req.user?.likedSongs },
  });
  console.log(likedSongs, "this is liked songssssss");

  return res.status(200).json(likedSongs);
});

//ADMIN//

router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const songId = req.params.id;

    // Check if the song exists
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    // Delete the song from the database
    await Song.findByIdAndDelete(songId);

    // Respond with success message
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export { router as songsRouter };
