import Logger from "./lib/logger";
import Config from "./lib/configuration";
import HTTPServer from "./lib/http_server";

const logger = Logger.init();
logger.add("service started");

const config = Config.load();
logger.add("configuration loaded");

const httpServer = HTTPServer.init(config.web, logger);
httpServer.handle("get", "/ping", (_req, res) => { res.send("OK!") })
httpServer.listen();
