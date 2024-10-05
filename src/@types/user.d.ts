import { ISong } from "./song.d";
type IUser = {
  name: string;
  email: string;
  password: string;
  gender: string;
  month: string;
  date: string;
  year: string;
  likedSongs?: ISong[];
  playlists: [IPlaylist];
  isAdmin?: boolean;
  _id?: string;
  failedLoginAttempts: number;
  lastFailedLogin: Date;
};
type IJWTDecoded = {
  payload: IJWTPayload;
  iat: number;
  exp: number;
};

type IJWTPayload = {
  email: string;
  isAdmin: boolean;
};
type IJWTPayloadUserId = {
  email: string;
  userId: string;
};
type ILogin = {
  email: string;
  password: string;
};

export { IUser, IJWTDecoded, IJWTPayload, IJWTPayloadUserId, ILogin };
