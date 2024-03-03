import { Router } from "express";
import { validateToken } from "../middleWare/validate-token";
import { Category } from "../database/models/category-model";

const router = Router();
router.get("/", validateToken, async (req, res) => {
  try {
    // Extract query parameters from the request
    const categorys = await Category.find();

    // Query playlists from the database based on the filter

    return res.status(200).json(categorys);
    // Return the playlists as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { router as categoryRouter };
