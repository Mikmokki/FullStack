import { Gender,PatientEntry,BirthDate, Entry } from "./types";

export const parsePatient = (object: {
    name: unknown;
    dateOfBirth: unknown;
    gender: unknown;
    ssn: unknown;
    occupation: unknown;
    entries: unknown;
  }): PatientEntry => ({
    name: parseName(object.name),
    dateOfBirth: parseBirthDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
    entries: object.entries as Entry[]
  });

  const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
  };
  
  const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error("Incorrect or missing name");
    }
  
    return name;
  };

  const parseBirthDate = (date: unknown): BirthDate => {
    if (!date || !isString(date)) {
      throw new Error("Incorrect or missing date of birth");
    }
  
    const splitDate = date.split("-");
  
    if (splitDate.length !== 3) {
      throw new Error("Date is in incorrect format");
    }
  
    const dateInNumbers = splitDate.map((e) => parseInt(e));
  
    if (dateInNumbers.some((e) => isNaN(e))) {
      throw new Error("Date is in incorrect format");
    }
  
    return `${dateInNumbers[0]}-${dateInNumbers[1]}-${dateInNumbers[2]}` as BirthDate;
  };
    const parseGender = (gender: any): Gender => {
        if ( !Object.values(Gender).includes(gender))
       { 
           console.log(gender)
           throw new Error("Set gender to Male, Female or Other");
      };
      return gender as Gender
    };
        const parseOccupation = (occupation: unknown): string => {
            if (!occupation || !isString(occupation)) {
              throw new Error("Incorrect or missing occupation");
            }
          
            return occupation;
          };

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
              throw new Error("Incorrect or missing ssn");
    }
    
    return ssn;
    };