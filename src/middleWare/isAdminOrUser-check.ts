import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/models/user-model";
import { extractToken } from "./isAdmin-check";
import { SongsError } from "../error/song-error";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    //get user from database:
    const user = await User.findOne({ email });

    if (!user) throw new SongsError("User does not exist", 401);

    if (id == user.id) return next();

    if (user.isAdmin) return next();

    res
      .status(401)
      .json({ message: "Only admin/The id must belong to the user" });
  } catch (e) {
    next(e);
  }
};

export { isAdminOrUser };
