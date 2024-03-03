import Joi from "joi";
import { ICategory } from "./../@types/category.d";

const joiCategorySchema = Joi.object<ICategory>({
  id: Joi.string().required(),
  name: Joi.string().required(),
  tagline: Joi.string().required(),
  songs: Joi.array().items(
    Joi.object().keys({
      // Define the schema for each song object
      // Assuming ISong has its own Joi schema
    })
  ),
});

export { joiCategorySchema };
