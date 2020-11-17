
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

  const average = exercises.reduce((acc, curr) => 
    acc+curr, 0) / exercises.length;
  const rating = () => {
    if (average < 0.8 * target) return 1
    if (average > 1.2 * target) return 3
    else return 2
  }
  const ratingDescription =(rating: number) : string => {
    switch(rating) {
      case 1:
        return 'pretty bad'
      case 2:
        return 'not too bad, but could be better'
      case 3:
        return 'pretty good!'
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

const trainingArray = [3, 0, 2, 4.5, 0, 3, 1];
const target = 2;
console.log(calculateExercises(trainingArray, target))

/*
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
  */