import { CoursePart } from "../App";

export const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );
  return <p>Number of exercises {totalExercises}</p>;
};
