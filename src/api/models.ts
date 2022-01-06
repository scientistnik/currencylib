export enum OrderSide {
  BUY = "BUY",
  SELL = "SELL",
}

export enum OrderStatus {
  NEW = "NEW",
  FILLED = "FILLED",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  PARTIALLY_FILLED = "PARTIALLY_FILLED",
  PENDING_CANCEL = "PENDING_CANCEL",
}

export enum TimeInForce {
  GTC = "GTC",
  IOC = "IOC",
  FOK = "FOK",
}

export enum OrderType {
  LIMIT = "LIMIT",
  MARKET = "MARKET",
  STOP = "STOP",
  LIMIT_MAKER = "LIMIT_MAKER",
  STOP_LOSS = "STOP_LOSS",
  STOP_LOSS_LIMIT = "STOP_LOSS_LIMIT",
  TAKE_PROFIT = "TAKE_PROFIT",
  TAKE_PROFIT_LIMIT = "TAKE_PROFIT_LIMIT",
}

export enum ChartInterval {
  ONE_MIN = "1m",
  FIVE_MIN = "5m",
  FIFTEEN_MIN = "15m",
  THIRTY_MIN = "30m",
  ONE_HOUR = "1h",
  FOUR_HOUR = "4h",
  ONE_DAY = "1d",
  ONE_WEEK = "1w",
}

export enum AssetType {
  BOND = "BOND",
  COMMODITY = "COMMODITY",
  CREDIT = "CREDIT",
  CRYPTOCURRENCY = "CRYPTOCURRENCY",
  CURRENCY = "CURRENCY",
  EQUITY = "EQUITY",
  ICO = "ICO",
  INDEX = "INDEX",
  INTEREST_RATE = "INTEREST_RATE",
  OTHER_ASSET = "OTHER_ASSET",
  REAL_ESTATE = "REAL_ESTATE",
  UTILITY_TOKENS = "UTILITY_TOKENS",
}

export enum MarketType {
  LEVERAGE = "LEVERAGE",
  SPOT = "SPOT",
}

export enum SymbolStatus {
  AUCTION_MATCH = "AUCTION_MATCH",
  BREAK = "BREAK",
  END_OF_DAY = "END_OF_DAY",
  HALT = "HALT",
  POST_TRADING = "POST_TRADING",
  PRE_TRADING = "PRE_TRADING",
  TRADING = "TRADING",
}

export enum MarketModes {
  CLOSED_FOR_CORPORATE_ACTION = "CLOSED_FOR_CORPORATE_ACTION",
  CLOSE_ONLY = "CLOSE_ONLY",
  HOLIDAY = "HOLIDAY",
  LONG_ONLY = "LONG_ONLY",
  REGULAR = "REGULAR",
  UNKNOWN = "UNKNOWN",
  VIEW_AND_REQUEST = "VIEW_AND_REQUEST",
  VIEW_ONLY = "VIEW_ONLY",
}

export enum KlinesType {
  CLASSIC = "classic",
  HEIKEN_ASHI = "heiken-ashi",
}

export enum DtoState {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  INVALID = "INVALID",
}

export enum DtoType {
  HEDGE = "HEDGE",
  NET = "NET",
}

export enum RejectReason {
  ACCOUNT_NOT_FOUND = "ACCOUNT_NOT_FOUND",
  CLOSED_MARKET = "CLOSED_MARKET",
  CLOSE_ONLY = "CLOSE_ONLY",
  ENGINE_BUSY = "ENGINE_BUSY",
  HEDGING_MODE_GSL = "HEDGING_MODE_GSL",
  INSTRUMENT_NOT_AVAILABLE = "INSTRUMENT_NOT_AVAILABLE",
  INSTRUMENT_NOT_FOUND = "INSTRUMENT_NOT_FOUND",
  INVALID_ORDER = "INVALID_ORDER",
  INVALID_ORDER_QTY = "INVALID_ORDER_QTY",
  INVALID_PRICE = "INVALID_PRICE",
  LONG_ONLY = "LONG_ONLY",
  OFF_MARKET = "OFF_MARKET",
  ORDER_NOT_FOUND = "ORDER_NOT_FOUND",
  ORIGINAL_GSL_UPDATE = "ORIGINAL_GSL_UPDATE",
  POSITION_NOT_FOUND = "POSITION_NOT_FOUND",
  RC_INSTRUMENT_CLIENT_MOP = "RC_INSTRUMENT_CLIENT_MOP",
  RC_INSTRUMENT_GLOBAL_MOP = "RC_INSTRUMENT_GLOBAL_MOP",
  RC_NOT_ENOUGH_MARGIN = "RC_NOT_ENOUGH_MARGIN",
  RC_NOT_FOUND = "RC_NOT_FOUND",
  RC_NO_RATES = "RC_NO_RATES",
  RC_SETTLEMENT = "RC_SETTLEMENT",
  RC_UNKNOWN = "RC_UNKNOWN",
  REQUIRED_GSL = "REQUIRED_GSL",
  RISK_CHECK = "RISK_CHECK",
  THROTTLING = "THROTTLING",
  UNKNOWN = "UNKNOWN",
}

export enum PositionSource {
  CLOSE_OUT = "CLOSE_OUT",
  DEALER = "DEALER",
  SL = "SL",
  SYSTEM = "SYSTEM",
  TP = "TP",
  USER = "USER",
}

export enum PositionStatus {
  CLOSED = "CLOSED",
  DIVIDEND = "DIVIDEND",
  MODIFIED = "MODIFIED",
  MODIFY_REJECT = "MODIFY_REJECT",
  OPENED = "OPENED",
  SWAP = "SWAP",
}

export enum RequestDtoType {
  ORDER_CANCEL = "ORDER_CANCEL",
  ORDER_MODIFY = "ORDER_MODIFY",
  ORDER_NEW = "ORDER_NEW",
  POSITION_MODIFY = "POSITION_MODIFY",
}

export enum RequestDtoState {
  CANCELLED = "CANCELLED",
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
}

export type AccountBalance = {
  accountId: string;
  asset: string;
  collateralCurrency: boolean;
  default: boolean;
  free: number;
  locked: number;
};

type SecretFields = {
  apiKey: string;
  signature: string;
  timestamp: BigInt;
};

export type BaseAccountRequest = {
  recvWindow?: BigInt;
  showZeroBalance?: boolean;
};

export type AccountRequest = BaseAccountRequest & SecretFields;

export type AccountResponse = {
  affiliateId: string;
  balances: AccountBalance[];
  buyerCommission: number;
  canDeposit: boolean;
  canTrade: boolean;
  canWithdraw: boolean;
  makerCommission: number;
  sellerCommission: number;
  takerCommission: number;
  updateTime: BigInt;
  userId: BigInt;
};

export type AggTrades = {
  T: BigInt;
  a: BigInt;
  m: boolean;
  p: string;
  q: string;
};

export type AggTradesRequest = {
  endTime?: BigInt;
  limit?: number;
  startTime?: BigInt;
  symbol: string;
};

export type AggTradesResponse = {
  aggTrades: AggTrades[];
};

export type BaseAllMyTradesRequest = {
  endTime?: BigInt;
  limit?: number;
  recvWindow?: BigInt;
  startTime?: BigInt;
  symbol: string;
};

export type AllMyTradesRequest = BaseAllMyTradesRequest & SecretFields;

export type AllMyTradesResponse = {
  myTrades: MyTradesResponse[];
};

export type BySymbolRequest = {
  symbol: string;
};

export type BaseCancelOrderRequest = {
  orderId: string;
  recvWindow?: BigInt;
  symbol: string;
};

export type CancelOrderRequest = BaseCancelOrderRequest & SecretFields;

export type CancelOrderResponse = {
  executedQty: string;
  orderId: string;
  origQty: string;
  price: string;
  side: OrderSide;
  status: OrderStatus;
  symbol: string;
  timeInForce: TimeInForce;
  type: OrderType;
};

export type BaseCloseTradingPositionRequest = {
  positionId: string;
  recvWindow?: BigInt;
};

export type CloseTradingPositionRequest = BaseCloseTradingPositionRequest &
  SecretFields;

export type BaseCreateOrderRequest = {
  accountId?: BigInt;
  expireTimestamp?: BigInt;
  guaranteedStopLoss?: boolean;
  leverage?: number;
  newOrderRespType?: string;
  price?: number;
  quantity: number;
  recvWindow?: BigInt;
  side: string;
  stopLoss?: number;
  symbol: string;
  takeProfit?: number;
  type: string;
};

export type CreateOrderRequest = BaseCreateOrderRequest & SecretFields;

export type DepthRequest = {
  limit?: number;
  symbol: string;
};

export type DepthResponse = {
  asks: number[][];
  bids: number[][];
  lastUpdateId: BigInt;
};

export type EmptyRequest = {};
export type ExchangeFilter = {};

export type ExchangeInfo = {
  exchangeFilters: ExchangeFilter[];
  rateLimits: RateLimits[];
  serverTime: BigInt;
  symbols: ExchangeSymbolInfo[];
  timezone: string;
};

export type ExchangeSymbolInfo = {
  assetType: AssetType;
  baseAsset: string;
  baseAssetPrecision: number;
  country: string;
  exchangeFee: number;
  filters: SymbolFilter[];
  industry: string;
  longRate: number;
  makerFee: number;
  marketModes: MarketModes[];
  marketType: MarketType;
  maxSLGap: number;
  maxTPGap: number;
  minSLGap: number;
  minTPGap: number;
  name: string;
  orderTypes: OrderType[];
  quoteAsset: string;
  quoteAssetId: string;
  quotePrecision: number;
  sector: string;
  shortRate: number;
  status: SymbolStatus;
  swapChargeInterval: BigInt;
  symbol: string;
  takerFee: number;
  tickSize: number;
  tickValue: number;
  tradingFee: number;
  tradingHours: string;
};

export type InternalQuote = {
  bid: number;
  bidQty: number;
  ofr: number;
  ofrQty: number;
  symbolName: string;
  timestamp: BigInt;
};

export type KLinesRequest = {
  endTime?: BigInt;
  interval: ChartInterval;
  limit?: number;
  startTime?: BigInt;
  symbol: string;
  type?: KlinesType;
};

export type KLinesResponse = {
  lines: any[][];
};

export type BaseLeverageSettingsRequest = {
  recvWindow?: BigInt;
  symbol: string;
};

export type LeverageSettingsRequest = BaseLeverageSettingsRequest &
  SecretFields;

export type LeverageSettingsResponse = {
  value: number;
  values: number[];
};

export type MarketDepthData = {
  bid: { [key: string]: number };
  ofr: { [key: string]: number };
  ts: BigInt;
};

export type MarketDepthEvent = {
  data: MarketDepthData;
  symbol: string;
};

export type MyTradesResponse = {
  buyer: boolean;
  commission: string;
  commissionAsset: string;
  id: string;
  isBuyer: boolean;
  isMaker: boolean;
  maker: boolean;
  orderId: string;
  price: string;
  qty: string;
  quoteQty: string;
  symbol: string;
  time: BigInt;
};

export type NewOrderResponseRESULT = {
  executedQty: string;
  expireTimestamp: BigInt;
  guaranteedStopLoss: boolean;
  margin: number;
  orderId: string;
  origQty: string;
  price: string;
  rejectMessage: string;
  side: OrderSide;
  status: OrderStatus;
  stopLoss: number;
  symbol: string;
  takeProfit: number;
  timeInForce: TimeInForce;
  transactTime: BigInt;
  type: OrderType;
};

export type OHLCBar = {
  c: number;
  h: number;
  interval: ChartInterval;
  l: number;
  o: number;
  symbol: string;
  t: BigInt;
  type: string;
};

export type OHLCSubscribeRequest = {
  intervals: ChartInterval[];
  symbols: string[];
  type: KlinesType;
};

export type BaseOpenOrderRequest = {
  symbol?: string;
  recvWindow?: BigInt;
};

export type OpenOrderRequest = BaseOpenOrderRequest & SecretFields;

export type OpenOrdersReponse = {
  openOrders: QueryOrderResponse[];
};

export type PingRequest = {};
export type PingResponse = {};

export type PositionDto = {
  accountId: string;
  closePrice: number;
  closeQuantity: number;
  closeTimestamp?: BigInt;
  cost?: number;
  createdTimestamp: BigInt;
  currency: string;
  dividend?: number;
  fee?: number;
  guaranteedStopLoss?: boolean;
  id: string;
  instrumentId: BigInt;
  margin: number;
  openPrice: number;
  openQuantity: number;
  openTimestamp: BigInt;
  orderId: string;
  rpl?: number;
  rplConverted?: number;
  state: DtoState;
  stopLoss?: number;
  swap?: number;
  swapConverted?: number;
  symbol?: string;
  takeProfit?: number;
  type?: DtoType;
  upl?: number;
  uplConverted?: number;
};

export type PositionExecutionReportDto = {
  accountCurrency: string;
  accountId: BigInt;
  createdTimestamp: BigInt;
  currency: string;
  execTimestamp: BigInt;
  executionType?: TimeInForce;
  fee?: number;
  feeDetails?: { [key: string]: string };
  fxRate?: number;
  gSL?: boolean;
  instrumentId: BigInt;
  positionId: string;
  price?: number;
  quantity?: number;
  rejectReason?: RejectReason;
  rpl?: number;
  rplConverted?: number;
  source: PositionSource;
  status: PositionStatus;
  stopLoss?: number;
  swap?: number;
  swapConverted?: number;
  symbol?: string;
  takeProfit?: number;
};

export type BasePositionHistoryRequest = {
  limit?: number;
  recvWindow?: BigInt;
  symbol?: string;
};

export type PositionHistoryRequest = BasePositionHistoryRequest & SecretFields;

export type QueryOrderResponse = {
  accountId: string;
  executedQty: string;
  expireTimestamp: BigInt;
  guaranteedStopLoss: boolean;
  icebergQty: string;
  leverage: boolean;
  margin: number;
  orderId: string;
  origQty: string;
  price: string;
  side: OrderSide;
  status: OrderStatus;
  stopLoss: number;
  symbol: string;
  takeProfit: number;
  time: BigInt;
  timeInForce: TimeInForce;
  type: OrderType;
  updateTime: BigInt;
  working: boolean;
};

export type RateLimits = {
  interval: ChartInterval;
  intervalNum: number;
  limit: number;
  rateLimitType: string;
};

export type RequestDto = {
  accountId: string;
  createdTimestamp: BigInt;
  id: BigInt;
  instrumentId: BigInt;
  orderId?: string;
  positionId?: string;
  rejectReason?: RejectReason;
  rqBody: string;
  rqType: RequestDtoType;
  state: RequestDtoState;
};

export type ServerTime = {
  serverTime: BigInt;
};

export type BaseSignedBySymbolRequest = {
  recvWindow?: BigInt;
  symbol?: string;
};

export type SignedBySymbolRequest = BaseSignedBySymbolRequest & SecretFields;

export type BaseSignedRequest = {
  recvWindow?: BigInt;
};

export type SignedRequest = BaseSignedRequest & SecretFields;

export type SubscribeRequest = {
  symbols: string[];
};

export type SubscribeResponse = {
  subscriptions: { [key: string]: string };
};

export type SymbolFilter = {
  filterType: string;
};

export type Ticker24HResponse = {
  tickers: Ticker24hr[];
};
export type Ticker24hr = {
  askPrice: string;
  bidPrice: string;
  closeTime: BigInt;
  highPrice: string;
  lastPrice: string;
  lastQty: string;
  lowPrice: string;
  openPrice: string;
  openTime: BigInt;
  prevClosePrice: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  volume: string;
  weightedAvgPrice: string;
};

export type TradeEventReq = {
  id: number;
  orderId: string;
  price: number;
  size: number;
  symbol: string;
  ts: BigInt;
};

export type TradeEventRes = {
  buyer: boolean;
  id: number;
  orderId: string;
  price: number;
  size: number;
  symbol: string;
  ts: BigInt;
};

export type TradingOrderUpdateResponse = {
  requestId: BigInt;
  state: RequestDtoState;
};

export type TradingPositionCloseAllResponse = {
  request: RequestDto[];
};

export type TradingPositionHistoryResponse = {
  history: PositionExecutionReportDto[];
};

export type TradingPositionListResponse = {
  positions: PositionDto[];
};

export type TradingPositionUpdateResponse = {
  requestId: BigInt;
  state: RequestDtoState;
};

export type BaseUpdateTradingOrderRequest = {
  expireTimestamp?: BigInt;
  guaranteedStopLoss?: boolean;
  orderId: string;
  recvWindow?: BigInt;
  stopLoss?: number;
  takeProfit?: number;
};

export type UpdateTradingOrderRequest = BaseUpdateTradingOrderRequest &
  SecretFields;

export type BaseUpdateTradingPositionRequest = {
  guaranteedStopLoss?: boolean;
  positionId: string;
  recvWindow?: BigInt;
  stopLoss?: number;
  takeProfit?: number;
};

export type UpdateTradingPositionRequest = BaseUpdateTradingPositionRequest &
  SecretFields;
