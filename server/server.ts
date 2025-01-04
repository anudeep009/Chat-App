import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.routes";
import connectDB from "./db";

dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


app.use("/api/auth",userRoutes);