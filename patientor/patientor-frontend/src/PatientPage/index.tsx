import React from "react";
import axios from "axios";
import { Container, Icon, List } from "semantic-ui-react";


import { Patient, GenderIcon } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
interface RouteParams {
  id: string;
}

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
          <h3>{patient.name} <Icon name={GenderIcon[patient.gender]} /> </h3>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h4>entries</h4>
          <div>{patient.entries.map((e, i) => (
            <div key={i}>
            <p key={i}>{e.date} <i>{e.description}</i></p>
            <List bulleted>
            {e.diagnosisCodes?.map(code => (
              <List.Item key={code}>{code} {diagnoses[code].name} </List.Item>
            ))}
            </List>
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
