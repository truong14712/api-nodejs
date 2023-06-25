import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import ConnectDB from "./db.js";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
// import { fileURLToPath } from "url";
dotenv.config();
const app = express();
const { PORT } = process.env;
const hostname = "localhost";
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use("/", express.static(path.join(__dirname, "uploads")));
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
