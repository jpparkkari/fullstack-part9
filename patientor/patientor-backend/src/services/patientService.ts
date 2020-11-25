import patients from '../../data/patients';
import { Patient, NoSsnPatient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

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

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };
/*

  name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
): Patient => {
  const newPatient = {
   
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    id: 
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      uuidv4(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };*/
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNoSsnPatients,
  addPatient
};