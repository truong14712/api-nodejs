import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import ConnectDB from "../db";
import cors from "cors";
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

/* A function that connects to the database. */
ConnectDB();
// run website
// app.use(cors());

app.use("/api", router);
export const viteNodeApp = app;
