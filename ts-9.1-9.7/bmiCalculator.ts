type Result = string;

interface BmiValues {
  height: number;
  weight: number;
}

export const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were missing or were not numbers');
  }
}


export const calculateBmi = (height: number, weight: number) : Result => {
  
  const bmi : number = weight/(height/100*height/100)

  if (bmi < 20) 
    return "Low (underweight)";
  if (bmi >= 20 && bmi <= 25) 
    return "Normal (healthy weight)";
  if (bmi > 25) 
    return "High (overweight)";
  
  return "Cannot determine. Something went wrong"
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log('BMI Error, something very bad happened, message: ', e.message)
}
