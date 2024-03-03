import express, { json } from "express";
import configDotEnv from "./config";
import { connect } from "./database/connection";
import { songsRouter } from "./routes/songs";
import { usersRouter } from "./routes/users";
import { songUploadMiddleware } from "./middleWare/audio-Upload";
import path from "path";
import cors from "cors";
import { errorHandler } from "./middleWare/error-handler";
import { playlistRouter } from "./routes/playlist";
import { categoryRouter } from "./routes/category";

configDotEnv();
connect();
const app = express();
const port = 5001;
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(songUploadMiddleware);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello,Server!");
});
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/songs", songsRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/category", categoryRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on on http://localhost:${port}`);
});
