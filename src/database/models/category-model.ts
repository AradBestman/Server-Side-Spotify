import mongoose from "mongoose";
import { categorySchema } from "../schemaS/category-schema";
const Category = mongoose.model("category", categorySchema);
export { Category };
