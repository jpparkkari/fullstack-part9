type Result = string;

const calculateBmi = (height: number, weight: number) : Result => {
  const bmi : number = weight/(height/100*height/100)

  if (bmi < 20) 
    return "Low (underweight)";
  if (bmi >= 20 || bmi <= 25) 
    return "Normal (healthy weight)";
  if (bmi > 25) 
    return "High (overweight)";
}

console.log(calculateBmi(180, 74))