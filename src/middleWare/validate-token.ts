import { RequestHandler, Request } from "express";
import { SongsError } from "../error/song-error";
import { auth } from "../service/auth-service";
import { User } from "../database/models/user-model";

const extractToken = (req: Request) => {
  const authHeader = req.header("x-auth-token");
  console.log(authHeader);

  if (authHeader) {
    return authHeader;
  }
  throw new SongsError("Token is missing in Authorization header", 400);
};
const validateToken: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = await User.findOne({ email });
    if (!user) throw new SongsError("User does not exist", 401);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
export { validateToken };
