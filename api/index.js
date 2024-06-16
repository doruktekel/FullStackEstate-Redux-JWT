import express from "express";
import dotenv from "dotenv";
import dB from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import { errorMiddleware, notFound } from "./middlewares/errormiddleware.js";

const app = express();

dotenv.config();
dB();

app.use(express.json());

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
