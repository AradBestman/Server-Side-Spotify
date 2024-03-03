import Joi from "joi";
import { Schema } from "mongoose";
import { ILogin } from "../@types/user";
import { emailRegex, passwordRegex } from "./patterns.joi";

const schema = Joi.object<ILogin>({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required(),
});
export { schema as joiLoginSchema };
