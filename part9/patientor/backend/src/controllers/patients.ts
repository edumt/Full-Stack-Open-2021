import { Router } from "express";
import { randomUUID } from "node:crypto";
import patients, { Patient, patientSchema } from "../models/patient";
import { ZodError } from "zod";

const patientsRouter = Router();

patientsRouter.get("/", (_, res) => {
  const patientsWithoutSsn: Omit<Patient, "ssn">[] = patients.map(
    ({ dateOfBirth, gender, id, name, occupation }) => ({
      dateOfBirth,
      gender,
      id,
      name,
      occupation,
    })
  );

  res.json(patientsWithoutSsn);
});

patientsRouter.post("/", (req, res) => {
  try {
    const patient = patientSchema.parse({ ...req.body, id: randomUUID() });
    patients.push(patient);
    res.json(req.body);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.message);
    } else {
      throw error;
    }
  }
});

export default patientsRouter;
