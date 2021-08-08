import express from 'express';
import cors from "cors";
import { Diagnose,Patient } from './types';
import diagnoseData from "./data/diagnoses.json";
import patientData from "./data/patients.json";
import { getSafePatients, createPatient} from './patientorService';
import { parsePatient } from './typeCheck';
const diagnoses: Diagnose[] = [...diagnoseData]
const patients: Patient[] = [...patientData as Patient[]]

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;


app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get("/api/diagnoses", (_req, res) => {
  res.send(diagnoses as Diagnose[]);
});

app.get("/api/patients", (_req, res) => {
  res.send(getSafePatients(patients));
});

app.get("/api/patients/:id", (req, res) => {
  res.send(patients.find((patient) => patient.id === req.params.id));
});

app.post('/api/patients', (req, res) => {
  try {
    const addedEntry = createPatient(parsePatient(req.body));
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});