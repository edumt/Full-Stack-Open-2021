import express from "express";
import { calculateBmi } from "./bmiCalculator";

const PORT = 3003;
const app = express();

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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
