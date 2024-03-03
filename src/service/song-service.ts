import { Song } from "../database/models/song-model";
import { ISongInput } from "../@types/song";

const createSong = async (data: ISongInput): Promise<any> => {
  const song = new Song(data);
  return song.save();
};

export { createSong };
