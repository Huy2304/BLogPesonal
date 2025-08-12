import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import blogPosts from "./routes/blogPosts.routes.js";
import authRoutes from "./routes/auth.routes.js"
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/blogs", blogPosts);
app.use("/api/auth", authRoutes);

// Connect DB & Start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
