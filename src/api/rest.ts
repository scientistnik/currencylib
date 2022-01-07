import fetch from "cross-fetch";
import { sha256 } from "js-sha256";
import {
  BaseAccountRequest,
  AccountResponse,
  AggTradesRequest,
  AggTradesResponse,
  BaseCloseTradingPositionRequest,
  TradingPositionCloseAllResponse,
  DepthRequest,
  DepthResponse,
  ExchangeInfo,
  KLinesRequest,
  KLinesResponse,
  BaseLeverageSettingsRequest,
  LeverageSettingsResponse,
  MyTradesResponse,
  BaseAllMyTradesRequest,
  QueryOrderResponse,
  BaseOpenOrderRequest,
  BaseCreateOrderRequest,
  NewOrderResponseRESULT,
  BaseCancelOrderRequest,
  CancelOrderResponse,
  BySymbolRequest,
  Ticker24hr,
  ServerTime,
  TradingPositionListResponse,
  BaseSignedRequest,
  TradingPositionHistoryResponse,
  BaseUpdateTradingOrderRequest,
  TradingOrderUpdateResponse,
  BaseUpdateTradingPositionRequest,
  TradingPositionUpdateResponse,
  BasePositionHistoryRequest,
} from "./models";

const DEFAULT_ENDPOINT = "https://api-adapter.backend.currency.com";
const VERSION_API = "v2";

type FetchMethod = "GET" | "POST" | "DELETE";

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

  private baseFetch<R>(
    name: string,
    params: object,
    method: FetchMethod = "GET",
    withSecret: boolean = true
    //body?: any
  ): Promise<R> {
    const url = new URL(`${this.baseEndpoint}/api/${VERSION_API}/${name}`);
    const options: any = { method };

    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value.toString())
    );

    if (withSecret) {
      url.searchParams.set("timestamp", Date.now().toString());
      url.searchParams.set(
        "signature",
        sha256.hmac(this.secret, url.searchParams.toString())
      );

      options.headers = { "X-MBX-APIKEY": this.apiKey };
    }

    return fetch(url.toString(), options).then(async res => {
      if (res.status >= 400)
        throw new Error(
          `Bad response from server, ${res.status} ${
            res.statusText
          }: ${await res.text()}`
        );

      try {
        let json = await res.json();
        if (json.code)
          throw new Error(`Error endpoint, ${JSON.stringify(json)}`);

        return json;
      } catch (error) {
        throw new Error(`Response is not json: ${await res.text()}`);
      }
    });
  }

  async accountInfo(params: BaseAccountRequest = {}) {
    return this.baseFetch<AccountResponse>("account", params);
  }

  async tradesAggregated(params: AggTradesRequest) {
    return this.baseFetch<AggTradesResponse>("aggTrades", params, "GET", false);
  }

  async tradingPositionClose(params: BaseCloseTradingPositionRequest) {
    return this.baseFetch<TradingPositionCloseAllResponse>(
      "closeTradingPosition",
      params,
      "POST"
    );
  }

  async orderBook(params: DepthRequest) {
    return this.baseFetch<DepthResponse>("depth", params, "GET", false);
  }

  async exchangeInfo() {
    return this.baseFetch<ExchangeInfo>("exchangeInfo", {}, "GET", false);
  }

  async klines(params: KLinesRequest) {
    return this.baseFetch<KLinesResponse>("klines", params, "GET", false);
  }

  async leverageSettings(params: BaseLeverageSettingsRequest) {
    return this.baseFetch<LeverageSettingsResponse>(
      "leverageSettings",
      params,
      "GET",
      true
    );
  }

  async listOfTrades(params: BaseAllMyTradesRequest) {
    return this.baseFetch<MyTradesResponse[]>("myTrades", params, "GET", true);
  }

  async listOfOpenOrders(params: BaseOpenOrderRequest = {}) {
    return this.baseFetch<QueryOrderResponse[]>(
      "openOrders",
      params,
      "GET",
      true
    );
  }

  async createOrder(params: BaseCreateOrderRequest) {
    return this.baseFetch<NewOrderResponseRESULT>(
      "order",
      params,
      "POST",
      true
    );
  }

  async cancelOrder(params: BaseCancelOrderRequest) {
    return this.baseFetch<CancelOrderResponse>("order", params, "DELETE", true);
  }

  async priceChange(params: BySymbolRequest) {
    return this.baseFetch<Ticker24hr>("ticker/24hr", params, "GET", false);
  }

  async serverTime() {
    return this.baseFetch<ServerTime>("time", {}, "GET", false);
  }

  async listOfLeverageTrades(params: BaseSignedRequest = {}) {
    return this.baseFetch<TradingPositionListResponse>(
      "tradingPositions",
      params,
      "GET",
      true
    );
  }

  async listOfHistoricalPositions(params: BasePositionHistoryRequest = {}) {
    return this.baseFetch<TradingPositionHistoryResponse>(
      "tradingPositionsHistory",
      params,
      "GET",
      true
    );
  }

  async leverageOrdersEdit(params: BaseUpdateTradingOrderRequest) {
    return this.baseFetch<TradingOrderUpdateResponse>(
      "updateTradingOrder",
      params,
      "POST",
      true
    );
  }

  async leverageTradeEdit(params: BaseUpdateTradingPositionRequest) {
    return this.baseFetch<TradingPositionUpdateResponse>(
      "updateTradingPosition",
      params,
      "POST",
      true
    );
  }
}
