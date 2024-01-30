interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(dailyHours: number[], target: number): Result {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(Boolean).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= 0.9 * target ? 2 : 1;
  const ratingDescription =
    rating === 1
      ? "those are rookie numbers"
      : rating === 2
      ? "not too bad but could be better"
      : "impressive, very nice";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const [, , target, ...hours] = process.argv;

console.log(calculateExercises(hours.map(Number), +target));
