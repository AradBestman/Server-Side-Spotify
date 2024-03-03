// @types/song.d.ts

export type ISongInput = {
  originalname: string;
  destination: string;
  size: number;
  filename: string;
  path: string; // Add path property
  userId: string;
};

export type ISong = ISongInput;
