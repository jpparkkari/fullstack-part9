import express from 'express';
import { calculateBmi, parseArguments } from './bmiCalculator'
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = 
      parseArguments( 
        ["foo", "bar", String(req.query.height), String(req.query.weight)] 
      );
      const data = calculateBmi(height, weight)
      res.send(data)
  } catch (error) {
      res.send(error.message)
  }

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});