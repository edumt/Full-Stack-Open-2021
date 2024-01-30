function calculateBmi(height: number, weight: number): string {
  const BMI = weight / (height / 100) ** 2;

  switch (true) {
    case BMI < 17:
      return "very underweight";
    case BMI < 18.5:
      return "underweight";
    case BMI < 25:
      return "normal (healthy weight)";
    case BMI < 30:
      return "overweight";
    case BMI < 35:
      return "obesity I";
    case BMI < 40:
      return "obesity II";

    default:
      return "obesity III";
  }
}

const [, , height, weight] = process.argv;

console.log(calculateBmi(+height, +weight));
