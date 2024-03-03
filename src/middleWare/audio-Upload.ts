import multer from "multer";
import fs from "fs";
import path from "path";
import { RequestHandler } from "express";
import { SongsError } from "../error/song-error";

const storage = multer.diskStorage({
  destination: "public/uploads/songs",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".mp3");
  },
});

const uploadSong = multer({
  storage: storage,
}).single("audioFile");

export { uploadSong as songUploadMiddleware };
