import Logger from "./lib/Logger";
import Config from "./lib/configuration/configuration";
import HttpServer from "./lib/http_server";

const logger = Logger.init();
logger.add("service started");

const config = Config.load();
logger.add("config loaded");

const httpServer = HttpServer.init(config.web, logger);
httpServer.handle("get", "/ping", (_req, res) => {
  res.send("OK");
});
httpServer.listen();
