import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
  }
  | {
      type: "ADD_ENTRY";
      payload: Entry;
      id: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      //const patientToBeModified = state.patients[action.id];
      //const entriesToBeModified = patientToBeModified.entries;
      //const modifiedEntries = {...entriesToBeModified, [action.payload.id]: action.payload};
      //console.log(modifiedEntries);
      if (!state.patient) return state;
      
      else {
       
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.id]: {
              ...state.patients[action.id], entries: [
                ...state.patients[action.id].entries, action.payload
              ]
              //state.patients[action.id].entries[action.payload.id]: action.payload;
            }
          },
          patient: {
            ...state.patient, entries: [
              ...state.patient.entries, action.payload 
            ]
          }
          //  state.patients.map( p => p.id === action.id ? {...p, entries: {...p.entries, [action.payload.id]: action.payload}} : p)
          
        };
      }
    default:

      return state;
  }
};

export const setPatientList = (payload: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: payload
  };
};

export const addPatient = (payload: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: payload
  };
};

export const setPatient = (payload: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: payload
  };
};

export const setDiagnoses = (payload: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: payload
  };
};

export const addEntry = (payload: Entry, id: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: payload,
    id: id
  };
};
