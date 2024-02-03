import app from "./app";

const config = { PORT: 3001 }; // should be an environment variable

app.listen(config.PORT, () => {
  console.info(`Server running on port ${config.PORT}`);
});
