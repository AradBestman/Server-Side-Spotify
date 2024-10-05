// @types/song.d.ts

export type ISongInput = {
  originalname: string;
  destination: string;
  size: number;
  filename: string;
  path: string; // Add path property
  userId: string;
  bitrate: number;
  duration?: number;
};

export type ISong = ISongInput;
