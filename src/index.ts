import express from "express";
import Logger from "./lib/Logger/logger";
import Configuration from "../config.json";

const logger = Logger.init();
logger.add("service started");

const app = express();
const port = Configuration.web.port;

app.get("/ping", (_req, res) => {
  res.send("OK!");
});

app.listen(port, () => {
  logger.add("express server started");
});
