import { WebConfig } from "../configuration/";

import express from "express";

type http_verb = "get" | "post" | "put" | "patch" | "delete";

interface HTTPServer {
  handle(
    method: http_verb,
    path: string,
    callback: (req: express.Request, res: express.Response) => void
  ): void;
  listen(callback: () => void): void;
}

const init = (config: WebConfig): HTTPServer => {
  const app = express();

  return {
    handle: (method, path, callback) => {
      app[method](path, callback);
    },
    listen: (callback) => {
      app.listen(config.port, callback);
    },
  };
};

export default { init };
