import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import ConnectDB from "./src/db.js";
import cors from "cors";
dotenv.config();
const app = express();
const { PORT } = process.env;
const hostname = "localhost";
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// Page Home
app.get("/", (req, res) => {
  res.send("SERVER ON");
});
/* A function that connects to the database. */
ConnectDB();
// run website
// app.use(cors());

app.listen(PORT, hostname, () => {
  console.log(`Hello Minh Truong Dev, I am running at ${hostname}:${PORT}`);
});
app.use("/api", router);
export const viteNodeApp = app;
