# currencylib

Library for work with currency.com exchange write on TypeScript.

## How to install

```
# npm install currencylib
or
# yarn add currencylib
```

## How to use

```js
import { Currency } from "currencylib";

const currency = new Currency({
  apiKey: "<API_KEY>",
  secret: "<SECRET_KEY>",
});

let balances = await currency.balances(); // get account balances
let filledOrders = await currency.history("BTC/RUB"); // get filled orders
let openOrders = await currency.getOpenOrders(); // get open orders

let buyMarketResult = await currency.buy("BTC/USD", 0.01); // create market order: buy 0.01 BTC by market price
let buyLimitResult = await currency.buy("BTC/USD", 0.01, 40_000); // create limit order: buy 0.01 BTC for 40 000$

let sellMarketResult = await currency.sell("BTC/USD", 0.01); // create market order: sell 0.01 BTC by market price
let sellLimitResult = await currency.sell("BTC/USD", 0.01, 50_000); // create limit order: sell 0.01 BTC for 50 000$
```

This library based on [official doc API](https://exchange.currency.com/api). If you want to use API as is, use `currency.api`:

```js
let info = currency.api.exchangeInfo();
```

## Contributing

Bug reports and pull requests are welcome on GitHub.

## License

The package is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
