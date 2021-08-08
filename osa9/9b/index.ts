import express,{ Request, Response } from 'express';
import { parseAndCalculate } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", ({ query }: Request, res: Response) => {
  const weight = query.weight;
  const height = query.height;
  try {
    res.send({ weight, height, bmi: parseAndCalculate(["useless","props",height as string, weight as string]) });
  } catch {
    res.send({ error: "malformatted parameters" });
  }
});

app.post("/exercises",({ body }: Request, res: Response) =>{
  console.log(body?.daily_exercises)
  try {
    res.send(calculateExercises(body?.daily_exercises, body?.target));
  } catch (error) {
    res.send(error);
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});