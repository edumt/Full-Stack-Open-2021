import { Router } from "express";
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

export default patientsRouter;
