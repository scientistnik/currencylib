import fetch from "cross-fetch";
import { sha256 } from "js-sha256";

const DEFAULT_ENDPOINT = "https://api-adapter.backend.currency.com";
const VERSION_API = "v2";

export enum ORDER_STATUS {
  NEW = "NEW",
  FILLED = "FILLED",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED",
}

export enum ORDER_TYPE {
  LIMIT = "LIMIT",
  MARKET = "MARKET",
  STOP = "STOP",
}

export enum ORDER_SIDE {
  BUY = "BUY",
  SELL = "SELL",
}

export enum TIME_IN_FORCE {
  GTC = "GTC",
  IOC = "IOC",
  FOK = "FOK",
}

export enum CHART_INTERVAL {
  ONE_MIN = "1m",
  FIVE_MIN = "5m",
  FIFTEEN_MIN = "15m",
  THIRTY_MIN = "30m",
  ONE_HOUR = "1h",
  FOUR_HOUR = "4h",
  ONE_DAY = "1d",
  ONE_WEEK = "1w",
}

export enum KLINES_TYPE {
  HEIKEN_ASHI = "heiken-ashi",
}
type FETCH_METHOD = "GET" | "POST" | "DELETE";

export class RestAPI {
  public baseEndpoint: string;

  private apiKey: string;
  private secret: string;

  constructor({
    endpoint,
    apiKey,
    secret,
  }: {
    endpoint?: string;
    apiKey: string;
    secret: string;
  }) {
    this.baseEndpoint = endpoint || DEFAULT_ENDPOINT;
    this.apiKey = apiKey;
    this.secret = secret;
  }

  private baseFetch(
    name: string,
    params: object,
    method: FETCH_METHOD = "GET",
    withSecret: boolean = true
    //body?: any
  ) {
    const url = new URL(`${this.baseEndpoint}/api/${VERSION_API}/${name}`);
    const options: any = { method };

    if (Object.keys(params).length > 0) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value.toString())
      );

      if (withSecret) {
        url.searchParams.set(
          "signature",
          sha256.hmac(this.secret, url.searchParams.toString())
        );

        options.headers = { "X-MBX-APIKEY": this.apiKey };
      }
    }

    return fetch(url.toString(), options).then(async (res) => {
      if (res.status >= 400)
        throw new Error(
          `Bad response from server, ${res.status} ${res.statusText}`
        );

      let json = await res.json();

      if (json.code) throw new Error(`Error endpoint, ${JSON.stringify(json)}`);

      return json;
    });
  }

  async accountInfo(params: {
    recvWindow?: number;
    timestamp: number;
    showZeroBalance?: boolean;
  }) {
    return this.baseFetch("account", params);
  }

  async tradesAggregated(params: {
    symbol: string;
    startTime?: number;
    endTime?: number;
    limit?: number;
  }) {
    return this.baseFetch("aggTrades", params, "GET", false);
  }

  async tradingPositionClose(params: {
    positionId: string;
    timestamp: number;
    recvWindow?: number;
  }) {
    return this.baseFetch("closeTradingPosition", params, "POST");
  }

  async orderBook(params: { symbol: string; limit?: number }) {
    return this.baseFetch("depth", params, "GET", false);
  }

  async exchangeInfo() {
    return this.baseFetch("exchangeInfo", {}, "GET", false);
  }

  async klines(params: {
    symbol: string;
    interval: CHART_INTERVAL;
    type?: KLINES_TYPE;
    startTime?: number;
    endTime?: number;
    limit?: number;
  }) {
    return this.baseFetch("klines", params, "GET", false);
  }

  async leverageSettings(params: {
    symbol: string;
    timestamp: number;
    recvWindow?: number;
  }) {
    return this.baseFetch("leverageSettings", params, "GET", true);
  }

  async listOfTrades(params: {
    symbol: string;
    timestamp: number;
    recvWindow?: number;
    startTime?: number;
    endTime?: number;
    limit?: number;
  }) {
    return this.baseFetch("myTrades", params, "GET", true);
  }

  async listOfOpenOrders(params: {
    timestamp: number;
    symbol?: string;
    recvWindow?: number;
  }) {
    return this.baseFetch("openOrders", params, "GET", true);
  }

  async createOrder(params: {
    symbol: string;
    timestamp: number;
    type: ORDER_TYPE;
    accountId: string;
    expireTimestamp: number;
    guaranteedStopLoss: boolean;
    leverage: number;
    price: number;
    quantity: number;
    side: ORDER_SIDE;
    stopLoss: number;
    takeProfit: number;
    newOrderRespType?: string;
    recvWindow?: number;
  }) {
    return this.baseFetch("order", params, "POST", true);
  }

  async cancelOrder(params: {
    orderId: string;
    symbol: string;
    timestamp: number;
    recvWindow?: number;
  }) {
    return this.baseFetch("order", params, "DELETE", true);
  }

  async priceChange(params: { symbol: string }) {
    return this.baseFetch("ticker/24hr", params, "GET", false);
  }

  async serverTime() {
    return this.baseFetch("time", {}, "GET", false);
  }

  async listOfLeverageTrades(params: {
    timestamp: number;
    recvWindow?: number;
  }) {
    return this.baseFetch("tradingPositions", params, "GET", true);
  }

  async listOfHistoricalPositions(params: {
    timestamp: number;
    symbol?: string;
    limit?: number;
    recvWindow?: number;
  }) {
    return this.baseFetch("tradingPositionsHistory", params, "GET", true);
  }

  async leverageOrdersEdit(params: {
    orderId: string;
    timestamp: number;
    expireTimestamp: number;
    guaranteedStopLoss: boolean;
    stopLoss: number;
    takeProfit: number;
    recvWindow?: number;
  }) {
    return this.baseFetch("updateTradingOrder", params, "POST", true);
  }

  async leverageTradeEdit(params: {
    positionId: string;
    timestamp: number;
    guaranteedStopLoss: boolean;
    stopLoss: number;
    takeProfit: number;
    recvWindow?: number;
  }) {
    return this.baseFetch("updateTradingPosition", params, "POST", true);
  }
}
