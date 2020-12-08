import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddHospitalEntryForm, AddOccupationalEntryForm, AddHealthCheckEntryForm } from './AddEntryForm';
import { Entry } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: unknown) => void;
  error?: string;
  type: Entry["type"];
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, type }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {type === "Hospital" ? <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} type={type}/> : null}
      {type === "OccupationalHealthcare" ? <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} type={type}/> : null}
      {type === "HealthCheck" ? <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} type={type}/> : null}
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
