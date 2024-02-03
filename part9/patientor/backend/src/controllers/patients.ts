import { Router } from "express";
import crypto from "node:crypto";
import patients, { Patient } from "../models/patient";

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
  const body = req.body as Omit<Patient, "id">; // unsafe type cast
  const patient: Patient = {
    id: crypto.randomUUID(),
    name: body.name,
    occupation: body.occupation,
    ssn: body.ssn,
    dateOfBirth: body.dateOfBirth,
    gender: body.gender,
  };

  patients.push(patient);
  res.json(req.body);
});

export default patientsRouter;
