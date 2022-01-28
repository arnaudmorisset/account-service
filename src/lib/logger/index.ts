import winston from "winston";

export interface Logger {
  add(msg: string): void
}

const format = winston.format.printf(({ message, timestamp }) => {
  return `${timestamp} : ${message}`;
});

const init = (): Logger => {
  const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }), format),
    defaultMeta: { service: "account-service" },
    transports: [
      new winston.transports.Console()
    ]
  });

  return {
    add: (msg) => {
      logger.log({ level: "info", message: msg })
    }
  };
};

export default { init };
