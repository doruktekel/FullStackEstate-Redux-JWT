import express, { urlencoded } from "express";
import dotenv from "dotenv";
import dB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { errorMiddleware, notFound } from "./middlewares/errormiddleware.js";
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

app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening port : ${PORT}`);
});
