import { depth, aggTrades, klines, ticker24hr } from "../src";

describe("Market endpoints", () => {
  describe("depth", () => {
    it("without required parameters", () => {
      return depth()
        .then(_ => {
          throw new Error("No error in the absence of required parameters");
        })
        .catch(_ => null);
    });

    it("with required parameters", () => {
      return depth("BTC/USD");
    });
  });

  describe("aggTrades", () => {
    it("without required parameters", () => {
      return aggTrades()
        .then(_ => {
          throw new Error("No error in the absence of required parameters");
        })
        .catch(_ => null);
    });

    it("with required parameters", () => {
      return aggTrades("BTC/USD");
    });
  });

  describe("klines", () => {
    it("without required parameters", () => {
      return klines()
        .then(_ => {
          throw new Error("No error in the absence of required parameters");
        })
        .catch(_ => null);
    });

    it("with required parameters", () => {
      return klines("BTC/USD", "1m");
    });
  });

  describe("ticker24hr", () => {
    it("without required parameters", () => {
      return ticker24hr();
    });

    it("with required parameters", () => {
      return ticker24hr("BTC/USD");
    });
  });
});
