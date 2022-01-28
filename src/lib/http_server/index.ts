import { Logger } from "../Logger";
import { WebConfig } from "../configuration/configuration";

import express from "express";

type http_verb = "get" | "post" | "put" | "patch" | "delete";

interface HTTPServer {
  handle(
    method: http_verb,
    path: string,
    callback: (req: express.Request, res: express.Response) => void
  ): void;
  listen(): void;
}

const init = (config: WebConfig, logger: Logger): HTTPServer => {
  const app = express();

  return {
    handle: (method, path, callback) => {
      app[method](path, callback);
    },
    listen: () => {
      app.listen(config.port, () => {
        logger.add("HTTP server started");
      });
    },
  };
};

export default { init };
