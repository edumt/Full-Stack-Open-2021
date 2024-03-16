import { CoursePart } from "../App";
import { Part } from "./Part";

export const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return courseParts.map((part) => (
    <p key={part.name}>
      {part.name} {part.exerciseCount}
      <br />
      <Part part={part} />
    </p>
  ));
};
