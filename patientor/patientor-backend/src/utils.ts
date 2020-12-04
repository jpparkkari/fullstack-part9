/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, HealthCheckRating, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, NewPatient } from './types';

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseObject = (value: any): string => {
  if (!value || !isString(value)) {
    throw new Error('Incorrect or missing value: ' + value);
  }
  console.log(value);
  return value;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthcheck rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseObject(object.name),
    ssn: parseObject(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseObject(object.occupation),
    gender: parseGender(object.gender),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: object.entries
  };
};
/*
const parseType = (type: string): NewEntry["type"] => {
  if(!type || type !== ("Hospital" || "OccupationaHealthCare" || "HealthCheck")) {
    throw new Error('incorrect type: ' + type);
  }
  return type;
};
*/

const parseHospitalEntry = (object: NewHospitalEntry): NewHospitalEntry => {
  const newEntry = {
    type: object.type,
    description: parseObject(object.description),
    date: parseDate(object.date),
    specialist: parseObject(object.specialist),
    diagnosisCodes: object.diagnosisCodes

  };
  if(object.discharge) {
    return {...newEntry, discharge: {date: parseDate(object.discharge.date), criteria: parseObject(object.discharge.criteria)}};
  }
  return newEntry;
};

const parseOccupationalHealthCareEntry = (object: NewOccupationalHealthcareEntry): NewOccupationalHealthcareEntry => {
  
  const newEntry = {
    type: object.type,
    description: parseObject(object.description),
    date: parseDate(object.date),
    specialist: parseObject(object.specialist),
    diagnosisCodes: object.diagnosisCodes,
    employerName: parseObject(object.employerName)

  };
  if(object.sickLeave) {
    return {...newEntry, sickLeave: {startDate: parseDate(object.sickLeave.startDate), endDate: parseDate(object.sickLeave.endDate)}};
  }
  return newEntry;
};

const parseHealthCheckEntry = (object: NewHealthCheckEntry): NewHealthCheckEntry => {
  const newEntry = {
    type: object.type,
    description: parseObject(object.description),
    date: parseDate(object.date),
    specialist: parseObject(object.specialist),
    diagnosisCodes: object.diagnosisCodes,
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)

  };
 
  return newEntry;
};



// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewHospitalEntry | NewHealthCheckEntry | NewOccupationalHealthcareEntry => {
  console.log(object);


  switch (object.type) {
    case "Hospital":
      return parseHospitalEntry(object);
    case "OccupationalHealthcare":
      return parseOccupationalHealthCareEntry(object);
    case "HealthCheck":
      return parseHealthCheckEntry(object);
    default:
      return parseHospitalEntry(object);
  }

  
};
