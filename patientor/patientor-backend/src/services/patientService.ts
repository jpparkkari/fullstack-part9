import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (pid: Patient['id'], entry: NewHealthCheckEntry | NewOccupationalHealthcareEntry  | NewHospitalEntry ): Entry | undefined => {
  const patient = patients.find( p => p.id === pid);
  const newEntry = {...entry, id:uuidv4() };
  patient?.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  addPatientEntry
};