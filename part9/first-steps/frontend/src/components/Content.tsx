import { CoursePart } from "../App";

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return courseParts.map((part) => (
    <p key={`${part.name}-${part.exerciseCount}`}>
      {part.name} {part.exerciseCount}
    </p>
  ));
};
