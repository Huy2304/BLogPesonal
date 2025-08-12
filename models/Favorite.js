import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_at: { type: Date, default: Date.now }
  });
  
  export default mongoose.model("Favorite", favoriteSchema);
  