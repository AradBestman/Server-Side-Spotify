import { RequestHandler, Request } from "express";
import { SongsError } from "../error/song-error";
import { auth } from "../service/auth-service";
import { User } from "../database/models/user-model";

// const extractToken = (req: Request) => {

//   const authHeader = req.header("Authorization");
//   if (
//     authHeader &&
//     authHeader.length > 7 &&
//     authHeader.toLowerCase().startsWith("bearer")
//   ) {
//     return authHeader.substring(7);
//   }
//   throw new SongsError("token is missing in Authorization header", 400);
// };

const extractToken = (req: Request) => {
  const authHeader = req.header("x-auth-token");

  if (authHeader && authHeader.length > 13) {
    return authHeader;
  }

  throw new SongsError(
    "Token is missing or invalid in x-auth-token header",
    400
  );
};

const isAdmin: RequestHandler = async (req, res, next) => {
  const token = extractToken(req); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IldpbGxpc0BiYXRjYXZlLmNvbSIsImlhdCI6MTcwMjU0NzM4N30.hD91HgG16KwP3T-sVj0DrcasaG7hHiDdkCR0s9WuHn4
  const { email } = auth.verifyJWT(token);
  //get user from database
  const user = await User.findOne({ email });

  const isAdmin = user?.isAdmin;
  if (isAdmin) {
    return next();
  }

  return res.status(401).json({ message: "Must be admin" });
};

export { isAdmin, extractToken };
