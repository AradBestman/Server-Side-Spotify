import mongoose, { Model, mongo } from "mongoose";
import userSchema from "../schemaS/user-schema";

const User = mongoose.model("users", userSchema);
export { User };
