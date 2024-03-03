import { joiSongSchema } from "../../joi/songs.joi";
import { joiUserSchema } from "../../joi/users.joi";
import { joiPlaylistSchema } from "../../joi/playlist.joi";
import { validateSchema } from "./validate-Schema";
import { joiLoginSchema } from "../../joi/login.joi";
import { joiCategorySchema } from "../../joi/category.joi";

const validateSong = validateSchema(joiSongSchema);
const validateRegister = validateSchema(joiUserSchema);
const validateLogin = validateSchema(joiLoginSchema);
const validatePlaylist = validateSchema(joiPlaylistSchema);
const validateCategory = validateSchema(joiCategorySchema);

export {
  validateSong,
  validateRegister,
  validatePlaylist,
  validateLogin,
  validateCategory,
};
