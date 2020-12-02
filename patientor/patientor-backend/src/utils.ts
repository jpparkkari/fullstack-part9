/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatient } from './types';

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseObject = (value: any): string => {
  if (!value || !isString(value)) {
    throw new Error('Incorrect or missing value: ' + value);
  }
  return value;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatient => {
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

export default toNewPatient;