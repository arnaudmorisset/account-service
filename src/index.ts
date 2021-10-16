import Logger from "./lib/logger";

const main = () => {
  const logger = Logger.init();
  logger.add("service started");
};

main();
