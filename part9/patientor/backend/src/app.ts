import cors from "cors";
import express from "express";
import diagnosesRouter from "./controllers/diagnoses";
import pingRouter from "./controllers/ping";

const app = express();

app.use(cors());

app.use("/api/ping", pingRouter);
app.use("/api/diagnoses", diagnosesRouter);

export default app;
