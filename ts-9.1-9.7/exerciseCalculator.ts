
interface TrainingResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exercises: Array<number>, target: number): TrainingResults => {

  if(isNaN(target) || exercises.length===0) throw new Error('target is not a number, or there is not enough arguments');

  const average = exercises.reduce(
    (acc, curr) => {
      if (isNaN(curr)) throw new Error('exercise hours are not numbers');
      return acc+curr;
    }, 0
    ) / exercises.length;
  
  const rating = () => {
    if (average < 0.8 * target) return 1;
    if (average > 1.2 * target) return 3;
    else return 2;
  }
  const ratingDescription =(rating: number) : string => {
    switch(rating) {
      case 1:
        return 'pretty bad';
      case 2:
        return 'not too bad, but could be better';
      case 3:
        return 'pretty good!';
      default:
        return 'cannot say. something went wrong.' 
    }
  }

  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter(d => d > 0).length,
    success: average >= target,
    rating: rating(),
    ratingDescription: ratingDescription(rating()),
    target: target,
    average: average
  }
}

const printResults = (args: Array<string>) => {
  const [, , target, ...rest] = args;
  console.log(calculateExercises( rest.map((a)=>Number(a)), Number(target) ));
}

try {
  printResults(process.argv);
} catch (e) {
  console.log(e.message);
}