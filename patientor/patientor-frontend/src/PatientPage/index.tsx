import React from "react";
import axios from "axios";
import { Button, Container, Icon, Segment } from "semantic-ui-react";

import AddEntryModal from "../AddEntryModal";
import { Patient, Icons, Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { addEntry, setPatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import HealthRatingBar from "../components/HealthRatingBar";
// import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
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


  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [type, setType] = React.useState<Entry['type']>('Hospital');

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: unknown) => {
 

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${params.id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, params.id));
      //dispatch({ type: "ADD_PATIENT", payload: newPatient });
      
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        type = {type}
      />
      <Button onClick={() => {setType("Hospital"); openModal();} }>Add New Hospital Entry</Button>
      <Button onClick={() => {setType("OccupationalHealthcare"); openModal();} }>Add New Occupational Entry</Button>
      <Button onClick={() => {setType("HealthCheck"); openModal();} }>Add New Health Check Entry</Button>
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
