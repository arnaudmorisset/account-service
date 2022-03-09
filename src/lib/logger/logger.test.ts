import Logger from "./";
import winston from "winston";

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
  it("should init correctly", () => {
    Logger.init();

    expect(winston.createLogger).toBeCalledTimes(1);
    expect(winston.format.combine).toBeCalledTimes(1);
    expect(winston.format.timestamp).toBeCalledWith({
      format: "YYYY-MM-DD HH:mm:ss",
    });
    expect(winston.format.printf).toBeCalledTimes(1);
    expect(winston.transports.Console).toBeCalledTimes(1);
  });
});
