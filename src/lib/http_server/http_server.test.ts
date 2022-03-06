import { request } from "undici";
import HTTPServer from "./";
import Configuration from "../configuration";

jest.mock("../configuration", () => {
  return {
    load: () => ({ web: { port: 8080 } })
  };
});

describe("HTTP Server", () => {
  it("should init and listen on given port", () => {
    const config = Configuration.load();

    const httpServer = HTTPServer.init(config.web);
    httpServer.handle("get", "/ping", (_req, res) => { res.send("OK!") });

    // TODO: Shutdown server once the test is over
    httpServer.listen(async () => {
      const response = await request(`http://localhost:${config.web.port}/ping`);
      const body = await response.body.text();

      expect(response.statusCode).toBe(200);
      expect(body).toBe("OK!");
    }).close();
  });
});
