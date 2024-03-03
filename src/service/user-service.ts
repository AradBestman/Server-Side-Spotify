import { IUser } from "../@types/user";
import { User } from "../database/models/user-model";
import { SongsError } from "../error/song-error";
import { auth } from "./auth-service";

const createUser = async (userData: IUser) => {
  const user = new User(userData);
  user.password = await auth.hashPassword(user.password);
  return user.save();
};

const validateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Bad Username or Password");
  }
  const maxAttempts = 3;
  if (user.failedLoginAttempts >= maxAttempts && user.lastFailedLogin) {
    const now = new Date();
    const blockHours = 24 * 60 * 60 * 1000;
    const timeDiff = now.getTime() - user.lastFailedLogin.getTime();
    if (timeDiff <= blockHours) {
      throw new SongsError("User is blocked,Try again 24hr later ", 401);
    } else {
      await User.findByIdAndUpdate(user._id, {
        $set: { failedLoginAttempts: 0, lastFailedLogin: null },
      });
    }
  }
  const passwordValid = await auth.validatePassword(password, user.password);
  if (!passwordValid) {
    await auth.handleFailedLogin(user._id);
    throw new SongsError("Bad Password", 401);
  }
  const Jwt = auth.generateJWT({
    email: user.email,
    isAdmin: user.isAdmin || false,
    _id: user._id,
  });
  return { Jwt };
};
export { createUser, validateUser };
