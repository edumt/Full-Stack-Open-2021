import { Router } from "express";

const pingRouter = Router();

pingRouter.get("/", (_, res) => {
  res.json({ hello: "world" });
});

export default pingRouter;
