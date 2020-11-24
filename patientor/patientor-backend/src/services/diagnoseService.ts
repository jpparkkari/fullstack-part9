import diagnoses from '../../data/diagnoses';
import { Diagnose, NonLatinDiagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

const getNonLatinDiagnoses = (): NonLatinDiagnose[] => {
  return diagnoses.map(({ code, name }) => ({
    code,
    name
  }));
};

export default {
  getDiagnoses,
  getNonLatinDiagnoses
};