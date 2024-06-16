import express, { urlencoded } from "express";
import dotenv from "dotenv";
import dB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import { errorMiddleware, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
dotenv.config();
dB();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcommen !" });
});

app.use("/api/auth", authRouter);

app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(3000, () => {
  console.log(`Listening port : ${PORT}`);
});
