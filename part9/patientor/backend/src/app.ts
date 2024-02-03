import cors from "cors";
import express from "express";
import pingRouter from "./controllers/ping";

const app = express();

app.use(cors());

app.use("/api/ping", pingRouter);

export default app;
