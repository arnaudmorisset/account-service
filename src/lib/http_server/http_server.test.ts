import HTTP from "http";
import HTTPServer from "./";
import Configuration from "../configuration";

jest.mock("../configuration", () => {
  return {
    load: () => ({ web: { port: 8080 } }),
  };
});

describe("HTTP Server", () => {
  it("should init and listen on given port", () => {
    const config = Configuration.load();

    const httpServer = HTTPServer.init(config.web);
    httpServer.handle("get", "/ping", (_req, res) => {
      res.send("OK!");
    });

    // TODO: Shutdown server once the test is over
    httpServer.listen(() => {
      const options = {
        hostname: "localhost",
        port: config.web.port,
        path: "/ping",
        method: "GET",
      };

      const req = HTTP.request(options, (res) => {
        res.on("data", (data) => {
          expect(data.toString()).toBe("OK!");
        });
      });

      req.on("error", (error) => {
        throw new Error(`HTTP request should not failed with error: ${error}`);
      });

      req.end();
    });
  });
});
