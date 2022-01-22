import express from "express";
import Logger from "./lib/logger/logger";
import Config from "./lib/configuration/configuration"

const logger = Logger.init();
logger.add("service started");

const config = Config.load();
logger.add("configuration loaded")

const app = express();
const port = config.web.port

app.get("/ping", (_req, res) => {
  res.send("OK!");
});

app.listen(port, () => {
  logger.add("express server started");
});
