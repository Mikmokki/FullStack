import { Patient,PatientEntry,PublicPatient } from './types';
import {v1 as uuid} from 'uuid'

export const getSafePatients = (patients: Patient[]): PublicPatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

  export const createPatient = (patient: PatientEntry): Patient => {
    const newPatient = { id: uuid(), ...patient};
    return newPatient;
  };

