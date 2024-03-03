import { ISong } from "./song.d";
export type ICategory = {
  id: string;
  name: string;
  tagline: string;
  songs: ISong[];
};
export type ICategory = ICategoryInput;
