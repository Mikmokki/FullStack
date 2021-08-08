export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
  }

export type BirthDate = `${number}-${number}-${number}`;

export interface Entry {
}
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: BirthDate;
    ssn: string;
    gender: Gender;
    occupation: string
    entries: Entry[]
  }

export interface Entry {
}
export type PatientEntry = Omit<Patient, "id">;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >
