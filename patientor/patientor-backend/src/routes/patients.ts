import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNoSsnPatients());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, ssn, dateOfBirth, gender, occupation } = req.body;
  const newPatient = patientService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  //patientService.newPatient

  res.json(newPatient);
});

export default router;