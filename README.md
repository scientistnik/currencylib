# currencylib

Library for work with currency.com exchange write on TypeScript.

## How to install

For Node.js:

```
# npm install currencylib
or
# yarn add currencylib
```

For browser [download file](https://github.com/scientistnik/currencylib/packages) and import in your html-file, use `currencylib` variable.

## How to use

This library based on [official doc API](https://exchange.currency.com/api).

### Public API

Check Server Time:

```js
import { time } from "currencylib";

time().then(console.log); // { serverTime: 1578484832656 }
```

Exchange Information:

```js
import { exchangeInfo } from "currencylib";

exchangeInfo().then(console.log);
/*
{
  "timezone": "UTC",
  "serverTime": 1577178958852,
  "rateLimits": [
    {
      //These are defined in the `ENUM definitions` section under `Rate Limiters (rateLimitType)`.
      //All limits are optional
    }
  ],
   "symbols": [
    {
      "symbol": "ETH",
            "status": "TRADING",
            "baseAsset": "ETH",
            "baseAssetPrecision": 3,
            "quoteAsset": "BTC",
            "orderTypes": [
                "LIMIT",
                "MARKET"
            ],
            "spotTradingAllowed": true,
            "marginTradingAllowed": true
    }
  ]
}
*/
```

### Market Data API

Order Book:

```js
import { depth } from "currencylib";

depth("ICE").then(console.log);
/*
{
  "lastUpdateId": 1027024,
  "asks": [
    [
      "4.00000200",  // PRICE
      "12.00000000"  // QTY
    ]
  ],
  "bids": [
    [
      "4.00000000",   // PRICE
      "431.00000000"  // QTY
    ]
  ]
  }
*/
```

Compressed/Aggregate Trades List:

```js
import { aggTrades } from "currencylib";

aggTrades("ICE").then(console.log);
/*
[
  {
    "a": 26129,         // Aggregate tradeId
    "p": "0.01633102",  // Price
    "q": "4.70443515",  // Quantity
    "T": 1498793709153  // Timestamp
     }
]
*/
```

Kline/Candlestick Data:

```js
import { klines } from "currencylib";

klines("ICE", "1m").then(console.log);
/*
[
  [
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815"   // Volume.
  ]
]
*/
```

24hr Ticker Price Change Statistics:

```js
import { ticker24hr } from "currencylib";

ticker24hr().then(console.log);
/*
[
  {
    "symbol": "LTC/BTC",
    "priceChange": "-94.99999800",
    "priceChangePercent": "-95.960",
    "prevClosePrice": "0.10002000",
    "lastPrice": "4.00000200",
    "openPrice": "99.00000000",
    "highPrice": "100.00000000",
    "lowPrice": "0.10000000",
    "volume": "8913.30000000",
    "openTime": 1499783499040,
    "closeTime": 1499869899040
      }
]
*/
```

### Account API

Account Information:

```js
import { auth } from "currencylib";

const account = auth(API_KEY, SECRET_KEY);

account.info().then(console.log);
/*
{
  "makerCommission": 15,
  "takerCommission": 15,
  "buyerCommission": 0,
  "sellerCommission": 0,
  "canTrade": true,
  "canWithdraw": true,
  "canDeposit": true,
  "updateTime": 123456789,
  "accountType": "SPOT",
  "balances": [
    {
      "asset": "BTC",
      "free": "4723846.89208129",
      "locked": "0.00000000"
    },
    {
      "asset": "LTC",
      "free": "4763368.68006011",
      "locked": "0.00000000"
    }
  ]
}
*/
```

Current Open Orders:

```js
import { auth } from "currencylib";

const account = auth(API_KEY, SECRET_KEY);

account.openOrders("ICE").then(console.log);
/*
[
  {
    "symbol": "BTC/USD",
    "orderId": "100234",
    "orderListId": -1, 
    "price": "4.00000100",
    "qty": "12.00000000",
    "quoteQty": "48.000012",
    "commission": "10.10000000",
    "commissionAsset": "BTC",
    "time": 1499865549590,
    "isBuyer": true,
    "isMaker": false
  }
]
*/
```

Account Trade List:

```js
import { auth } from "currencylib";

const account = auth(API_KEY, SECRET_KEY);

account.myTrades("ICE").then(console.log);
/*
[
  {
    "symbol": "LTC",
    "orderId": "1",
    "orderListId": -1, 
    "clientOrderId": "myOrder1",
    "price": "0.1",
    "origQty": "1.0",
    "executedQty": "0.0",
    "cummulativeQuoteQty": "0.0",
    "status": "NEW",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY",
    "stopPrice": "0.0",
    "time": 1499827319559,
    "updateTime": 1499827319559,
    "isWorking": true,
    "origQuoteOrderQty": "0.000000"
  }
]
*/
```

New Order (Work in Progress):

```js
import { auth } from "currencylib";

const account = auth(API_KEY, SECRET_KEY);

account.newOrder("ICE", "BUY", "MARKET", 12).then(console.log);
/*
{
  "orderId" : "00000000-0000-0000-0000-00000002ca43",
  "price" : "7183.3881",
  "clientOrderId" : "00000000-0000-0000-0000-00000002ca43",
  "side" : "BUY",
  "cummulativeQuoteQty" : null,
  "origQty" : "0.001",
  "transactTime" : 1577445603997,
  "type" : "MARKET",
  "executedQty" : "0.001",
  "status" : "FILLED",
  "fills" : [
   {
     "price" : "7169.05",
     "qty" : "0.001",
     "commissionAsset" : "dUSD",
     "commission" : "0"
   }
  ],
  "timeInForce" : "FOK",
  "symbol" : "BTC/USD"
}
*/
```

Cancel Order (Work in Progress):

```js
import { auth } from "currencylib";

const account = auth(API_KEY, SECRET_KEY);

account.cancelOrder("ICE").then(console.log);
/*
{
  "symbol": "LTC/BTC",
  "origClientOrderId": "myOrder1",
  "orderId": "4",
  "orderListId": -1,
  "clientOrderId": "cancelMyOrder1",
  "price": "2.00000000",
  "origQty": "1.00000000",
  "executedQty": "0.00000000",
  "cummulativeQuoteQty": "0.00000000",
  "status": "CANCELED",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "side": "BUY"
}
*/
```

## Contributing

Bug reports and pull requests are welcome on GitHub.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
