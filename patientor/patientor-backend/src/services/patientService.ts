import patients from '../../data/patients';
import { Patient, NoSsnPatient } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNoSsnPatients = (): NoSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients,
  getNoSsnPatients
};