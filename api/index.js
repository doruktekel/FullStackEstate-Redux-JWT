import express from "express";
import dotenv from "dotenv";
import dB from "./config/db.js";

const app = express();

dotenv.config();
dB();

app.get("/", (req, res) => {
  res.json({ message: "Welcommen !" });
});

const PORT = process.env.PORT || 4000;
app.listen(3000, () => {
  console.log(`Listening port : ${PORT}`);
});
