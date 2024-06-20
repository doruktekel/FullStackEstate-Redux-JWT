import express, { urlencoded } from "express";
import dotenv from "dotenv";
import dB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { errorMiddleware, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

dB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome !" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(3000, () => {
  console.log(`Listening port : ${PORT}`);
});
