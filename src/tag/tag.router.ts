

import express, { Router } from "express";
import { getTagController } from "./tag.controller.ts";


const tagRouter:Router = express.Router();

tagRouter.get("/getTags", getTagController);

tagRouter.get("/test", (req, res) => {
  res.send("Tag test endpoint");
});

export default tagRouter;
