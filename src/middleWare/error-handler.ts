import { ErrorRequestHandler } from "express";
import { Logger } from "../logs/logger";
import { SongsError } from "../error/song-error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  Logger.error(err);
  if (err instanceof SongsError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err.code && err.code == 1100 && err.keyPattern && err.keyValue) {
    return res.status(400).json({
      message: "Duplicate key - Must be unique",
      property: err.keyValue,
      index: err.keyPattern,
    });
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid Json" });
  }
  return res.status(500).json({ message: "Internal Server Error" });
};
export { errorHandler };
