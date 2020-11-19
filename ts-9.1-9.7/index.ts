import express from 'express';
import bodyParser from 'body-parser'
import { calculateBmi, parseArguments } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'
const app = express();
app.use(bodyParser.json()); // support json encoded bodies

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = 
      parseArguments( 
        ["foo", "bar", String(req.query.height), String(req.query.weight)] 
      );
      const data = calculateBmi(height, weight);
      res.send(data);
  } catch (error) {
      res.send(error.message);
  }

});

app.post('/exercises', (req, res) => {
  
  const target= req.body.target;

  const exercises = req.body.daily_exercises;

  if (!target || !exercises) {
    return res.status(400).send('parameters missing');
  }
  if ( isNaN(Number(target)) || !Array.isArray(exercises) || exercises.some(e => isNaN(Number(e))) ){
    return res.status(400).send('malformatted parameters')
  }

  try {
    const result = calculateExercises(exercises, target);
    return res.send(result);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});