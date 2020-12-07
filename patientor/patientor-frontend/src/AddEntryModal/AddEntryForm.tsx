import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Entry, HospitalEntry } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HospitalEntry, "id" >;



interface Props {
  onSubmit: (values: unknown) => void;
  onCancel: () => void;
  type: Entry["type"];
}

const HospitalEntryValues = () => (
  <>
      <Field 
          label="Discharge Date"
          placeholder="YYYY-MM-DD"
          name="discharge.date"
          component={TextField}
      />
      <Field 
          label="Discharge Criteria"
          placeholder="Criteria for discharge"
          name="discharge.criteria"
          component={TextField}
      />
  </>
);

const OccupationalHealthcareEntryValues = () => (
  <>
    <Field 
      label="Employer Name"
      placeHolder="Employer name"
      name="employerName"
      component={TextField}
    />
    <Field 
      label="Sick leave start"
      placeholder="YYYY-MM-DD"
      name="sickLeave.startDate"
      component={TextField}
    />

    <Field 
      label="Sick leave end"
      placeholder="YYYY-MM-DD"
      name="sickLeave.endDate"
      component={TextField}
    />
  </>
);

const setInitialValues = (type: Entry["type"]) => {
  switch (type) {
    case "Hospital":
      return{
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        }
      };
    case "OccupationalHealthcare":
      return {
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      };
    case "HealthCheck":
      return {
        type: "HealthCheck",
        healthCheckRating: 0
      };
    default:
      break;
  }
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel, type }) => {
  const [{ diagnoses } ] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [""],
        ...setInitialValues(type)
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            { type === "Hospital" ? <HospitalEntryValues /> : null }
            { type === "OccupationalHealthcare" ? <OccupationalHealthcareEntryValues /> : null }
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
