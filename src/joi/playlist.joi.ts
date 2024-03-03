import Joi from "joi";
import { IPlaylist } from "../@types/playlist";

const joiPlaylistSchema = Joi.object<IPlaylist>({
  name: Joi.string().required(),
  desc: Joi.string(),
  songs: Joi.array().items(Joi.string()), // Assuming songs is an array of string song IDs
  img: Joi.string().required(),
  playlist_id: Joi.string(), // Assuming playlist_id is optional
  userId: Joi.string().required(),
  category_id: Joi.string(), // Adding category_id field
});

export { joiPlaylistSchema };
