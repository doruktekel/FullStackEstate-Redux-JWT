import express, { urlencoded } from "express";
import dotenv from "dotenv";
import dB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import listRouter from "./routes/listRouter.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://fullstackestate-redux-jwt.onrender.com",
    // origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/dist")));

dotenv.config();
dB();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/list", listRouter);

// app.use(notFound);
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error !";
  let stack = process.env.NODE_ENV === "developer" ? err.stack : null;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening port : ${PORT}`);
});
