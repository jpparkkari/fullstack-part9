import React from "react";
import axios from "axios";
import { Container, Icon, Segment } from "semantic-ui-react";


import { Patient, Icons, Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import HealthRatingBar from "../components/HealthRatingBar";
interface RouteParams {
  id: string;
}

const BaseEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
      <>
      <h3>{entry.date} <Icon name={Icons[entry.type]} size="large" /></h3>
      <i>{entry.description}</i>
      </>
  );
};

const HospitalEntryBlock: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (    
    <Segment>
      <BaseEntry entry={entry} />
  {entry.discharge ? <p>Discharged on {entry.discharge.date}. Reason: {entry.discharge.criteria}</p> : null}
    </Segment>
  );
};
const OccupationalHealthcareEntryBlock: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (    
    <Segment>
      <h3>{entry.employerName}</h3>
      <BaseEntry entry={entry} />
      {entry.sickLeave ? <p>Given sickleave from {entry.sickLeave?.startDate} until {entry.sickLeave.endDate}</p> : null }
    </Segment>
  );
};
const HealthCheckEntryBlock: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (    
    <Segment>
      <BaseEntry entry={entry} />
      <HealthRatingBar rating={entry.healthCheckRating} showText = {false} />
    </Segment>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
  case "Hospital":
    return <HospitalEntryBlock entry={entry} />;
  case "OccupationalHealthcare":
    return <OccupationalHealthcareEntryBlock entry={entry} />;
  case "HealthCheck":
    return <HealthCheckEntryBlock entry={entry} />;
  default:
    return assertNever(entry);
  }
};

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [{ diagnoses }, ] = useStateValue(); 
  const params = useParams<RouteParams>();


  const getPatient = async () => {
    try {
      const { data: loadedPatient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${params.id}`
      );
      dispatch(setPatient(loadedPatient));
      //dispatch({ type: "SET_PATIENT", payload: loadedPatient });
    } catch (e) {
      console.error(e.response.data);
      //setError(e.response.error);
    }
  };
  if (!patient || patient.id !== params.id) {
    getPatient();
  }

  //the page first renders previous state of patient. Could not figure if that can be prevented.
  if (patient && Object.values(diagnoses).length > 0 ) {
    return (
      <div className="App">
        <Container textAlign="left">
          <h3>{patient.name} <Icon name={Icons[patient.gender]} /> </h3>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h4>entries</h4>
          <div>{patient.entries.map((e, i) => (
            <div key={i}>
            <EntryDetails entry={e} />
            
            </div>
          ))}</div>
        </Container>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <h3>no patient found</h3>
      </div>
    );
  }
};

export default PatientPage;
