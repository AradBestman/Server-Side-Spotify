import Joi from "joi";
import { IUser } from "../@types/user";
import { emailRegex, passwordRegex } from "./patterns.joi";

const schema = Joi.object<IUser>({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
  gender: Joi.string().required(),
  month: Joi.string().required(),
  date: Joi.string().required(),
  year: Joi.string().required(),
  likedSongs: Joi.array().items(Joi.string()).default([]),
  playlists: Joi.array().items(Joi.string()).default([]),
});

export { schema as joiUserSchema };
