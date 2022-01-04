import dotenv from "dotenv";
import { auth } from "../src";

dotenv.config();

const { API_KEY, SECRET_KEY } = process.env;

describe("Account", function() {
  let account = null;
  before(function() {
    if (!(API_KEY && SECRET_KEY)) this.skip();

    account = auth(API_KEY, SECRET_KEY);
  });

  it("info", () => account.info());
  it.skip("myTrades", () => account.myTrades("BTC/USD"));
  it.skip("openOrders", () => account.openOrders("BTC/USD"));
  it.skip("newOrder", () => account.newOrder());
  it.skip("cancelOrder", () => account.cancelOrder("ICE"));
});
