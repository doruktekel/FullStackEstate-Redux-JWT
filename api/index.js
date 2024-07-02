import express, { urlencoded } from "express";
import dotenv from "dotenv";
import dB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { errorMiddleware, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import listRouter from "./routes/listRouter.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

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
app.use("/api/list", listRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(3000, () => {
  console.log(`Listening port : ${PORT}`);
});
