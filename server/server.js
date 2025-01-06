import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.routes.js";
import connectDB from "./db/index.js";
import cors from "cors";
import userActions from "./routes/user.actions.routes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();
const app = express();
const origns = [
  "http://localhost:5173",
  "http://localhost:5173/api/auth/signup",
  "http://localhost:5173/api/auth/signin",
];
app.use(
  cors({
    origin: origns,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use("/api/auth", userRoutes);

app.use("/api/v1", userActions);
