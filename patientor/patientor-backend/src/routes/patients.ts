import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/:id', (req,res) => {
  res.send(patientService.getPatients().find(patient => patient.id === req.params.id));
});

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
  /*
    const { name, ssn, dateOfBirth, gender, occupation } = req.body;
    const newPatient = patientService.addPatient(
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    );
    //patientService.newPatient
  */
    res.json(addedPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;