import express from "express";
import Logger from "./lib/logger";

const main = () => {
  const logger = Logger.init();
  logger.add("service started");

  // This is 💩
  const app = express();
  const port = 8080;

  app.get("/ping", (_req, res) => {
    res.send("OK!");
  });

  app.listen(port, () => {
    logger.add("express server started");
  });
};

main();
