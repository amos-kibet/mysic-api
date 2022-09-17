import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true },
  password: { type: String, require: true },
  confirmedEmail: { type: Boolean, default: false },
});

export const User = mongoose.model("Users", userSchema);
