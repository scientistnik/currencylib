import { time, exchangeInfo } from "../src";

describe("Public endpoints", () => {
  it("time", () => time());
  it("exchangeInfo", () => exchangeInfo());
});
