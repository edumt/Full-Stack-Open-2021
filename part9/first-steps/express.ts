import express from "express";

const PORT = 8000;
const app = express();

app.get("/hello", (_, res) => res.send("Hello Full Stack!"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
