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
  it("myTrades", () => account.myTrades("ICE"));
  it("openOrders", () => account.openOrders("ICE"));
  it.skip("newOrder", () => account.newOrder());
  it.skip("cancelOrder", () => account.cancelOrder("ICE"));
});
