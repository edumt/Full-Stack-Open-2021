import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const PORT = 3003;
const app = express();

app.use(express.json());

app.get("/hello", (_, res) => res.send("Hello Full Stack!"));
app.get("/bmi", (req, res): void => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).json({
      error: "missing parameters",
    });
    return;
  }

  if (typeof height !== "string" || typeof weight !== "string") {
    res.status(400).json({
      error: "invalid parameters",
    });
    return;
  }

  const parsedHeight = +height;
  const parsedWeight = +weight;

  if (Number.isNaN(+parsedHeight) || Number.isNaN(+parsedWeight)) {
    res.status(400).json({
      error: "invalid parameters values",
    });
    return;
  }

  res.json({
    weight: parsedWeight,
    height: parsedHeight,
    bmi: calculateBmi(parsedHeight, parsedWeight),
  });
});
app.post("/exercises", (req, res): void => {
  const body = req.body as unknown;

  if (
    typeof body !== "object" ||
    !body ||
    !("daily_exercises" in body) ||
    !("target" in body) ||
    !body.daily_exercises ||
    !body.target
  ) {
    res.status(400).json({
      error: "missing parameters",
    });
    return;
  }

  const { daily_exercises, target } = body;

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((hours) => !Number.isNaN(+hours)) ||
    !(typeof target === "number")
  ) {
    res.status(400).json({
      error: "invalid parameters",
    });
    return;
  }

  res.json(calculateExercises(daily_exercises as number[], target));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
