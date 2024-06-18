import mongoose from "mongoose";

const CommentShcema = new mongoose.Schema(
  {
    comment: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
export default mongoose.model('Comment', CommentShcema)