import { CoursePart } from "../App";

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "background":
      return <>submit to {part.backgroundMaterial}</>;

    case "basic":
      return <>{part.description}</>;

    case "group":
      return <>group size: {part.groupProjectCount}</>;

    case "special":
      return <>required skills: {part.requirements.join(", ")}</>;

    default:
      part satisfies never;
      throw new Error("Unhandled part");
  }
};
