import { ISong } from "./../@types/song.d";
import Joi from "joi";

const schema = Joi.object<ISong>({
  originalname: Joi.string().required(),
  destination: Joi.string().required(),
  size: Joi.number().required(),
  bitrate: Joi.number().required(),
  duration: Joi.number().required(),
});

export { schema as joiSongSchema };
