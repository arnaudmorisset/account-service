import Logger from "./logger";
import { format } from "winston";

jest.mock("winston", () => {
  const format = {
    combine: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
  };

  const transports = {
    Console: jest.fn(),
  };
  const logger = {
    log: jest.fn(),
  };

  return {
    format,
    transports,
    createLogger: jest.fn(() => logger),
  };
});

describe("logger", () => {
  it("should do something", () => {
    const logger = Logger.init();
    logger.add("log from test");

    expect(format.printf).toBeCalledTimes(1);
  });
});
