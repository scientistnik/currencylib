export * from "./api";
import { RestAPI, OrderType, OrderSide } from "./api";

export class Currency {
  public api: RestAPI;

  constructor({
    endpoint,
    apiKey,
    secret,
  }: {
    endpoint?: string;
    apiKey: string;
    secret: string;
  }) {
    this.api = new RestAPI({
      endpoint,
      apiKey,
      secret,
    });
  }

  async balances() {
    return this.api.accountInfo().then(res => res.balances);
  }

  async history(symbol: string) {
    return this.api.listOfTrades({ symbol });
  }

  async getOpenOrders() {
    return this.api.listOfOpenOrders();
  }

  async buy(symbol: string, amount: number, price: number = 0) {
    return this.api.createOrder({
      symbol,
      quantity: amount,
      side: OrderSide.BUY,
      type: price > 0 ? OrderType.LIMIT : OrderType.MARKET,
      ...(price > 0 ? { price } : {}),
    });
  }

  async sell(symbol: string, amount: number, price: number = 0) {
    return this.api.createOrder({
      symbol,
      quantity: amount,
      side: OrderSide.SELL,
      type: price > 0 ? OrderType.LIMIT : OrderType.MARKET,
      ...(price > 0 ? { price } : {}),
    });
  }
}
