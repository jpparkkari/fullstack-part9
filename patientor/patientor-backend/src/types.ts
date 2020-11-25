export type NonLatinDiagnose = Omit<Diagnose, 'latin'>;

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export type NoSsnPatient = Omit<Patient, 'ssn'>;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string,
}
