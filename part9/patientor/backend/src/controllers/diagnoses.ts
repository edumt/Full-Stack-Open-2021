import { Router } from "express";
import diagnoses from "../models/diagnosis";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_, res) => {
  res.json(diagnoses);
});

export default diagnosesRouter;
