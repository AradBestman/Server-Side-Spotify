import { ILogin, IUser } from "../@types/user";
import { Router } from "express";
import { User } from "../database/models/user-model";
import { validateLogin, validateRegister } from "../middleWare/validation";
import { auth } from "../service/auth-service";
import { Logger } from "../logs/logger";
import { createUser, validateUser } from "../service/user-service";
import { isAdmin } from "../middleWare/isAdmin-check";
import { validateToken } from "../middleWare/validate-token";
import { SongsError } from "../error/song-error";
const router = Router();
//Register User
router.post("/register", validateRegister, async (req, res, next) => {
  try {
    const userSaved = await createUser(req.body as IUser);
    res.status(201).json({ message: "Saved", user: userSaved });
  } catch (error) {
    next(error);
  }
});
//Login User
router.post("/login", validateLogin, async (req, res, next) => {
  try {
    // Extract data from the request
    const { email, password } = req.body as ILogin;
    try {
      // Validate the user and handle failed login attempts
      const jwt = await validateUser(email, password);
      // Successful login
      res.json(jwt);
    } catch (e) {
      // Failed login
      Logger.error("Login failed:", e);
      // Check if the user is blocked
      if (e === "User is blocked. Try again later.") {
        // Send a response indicating that the user is blocked
        return res
          .status(401)
          .json({ error: "User is blocked. Try again later." });
      } else {
        // Send a generic error response
        res.status(401).json({ error: "Invalid email or password." });
        const userId = req.user?._id;
        if (userId) {
          try {
            // Handle failed login attempts for the user
            await auth.handleFailedLogin(userId);
          } catch (error) {
            console.error("Failed to handle login:", error);
          }
        }
      }
    }
  } catch (error) {
    // Handle other errors
    next(error);
  }
});
//get user data//
router.get("/my-user", validateToken, async (req, res, next) => {
  try {
    if (!req.user) throw new SongsError("user does not exist", 401);
    const { password, ...rest } = req.user as IUser;
    res.status(200).json(rest);
  } catch (err) {
    next(err);
  }
});

router.put("/my-user", validateToken, async (req, res, next) => {
  try {
    if (!req.user) throw new SongsError("user does not exist", 401);
    // Extract updated user data from the request body
    const updatedUserData = req.body as Partial<IUser>;
    // Update user profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedUserData,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//ONLY ADMIN
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});
//Delete id//
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    Logger.verbose("Delete Successfully");
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
});
export { router as usersRouter };
