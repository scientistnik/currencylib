import fetch from "./fetch";

const info = (apiKey, secretKey) => () => {
  const params = `timestamp=${Date.now()}`;
  return fetch.account({ apiKey, secretKey, params });
};

const myTrades = (apiKey, secretKey) => symbol => {
  if (!symbol) throw new Error("myTrades method required 'symbol' parameter");

  const params = `timestamp=${Date.now()}&symbol=${symbol}`;
  return fetch.myTrades({ apiKey, secretKey, params });
};

const openOrders = (apiKey, secretKey) => symbol => {
  if (!symbol) throw new Error("openOrders method required 'symbol' parameter");

  const params = `timestamp=${Date.now()}&symbol=${symbol}`;
  return fetch.openOrders({ apiKey, secretKey, params });
};

const newOrder = (apiKey, secretKey) => (symbol, side, type, quantity) => {
  if (!symbol) throw new Error("newOrder method required 'symbol' parameter");
  if (!side) throw new Error("newOrder method required 'side' parameter");
  if (!type) throw new Error("newOrder method required 'type' parameter");
  if (!quantity)
    throw new Error("newOrder method required 'quantity' parameter");

  const params = `timestamp=${Date.now()}&symbol=${symbol}`;
  const body = `side=${side}&type=${type}&quantity=${quantity}`;

  return fetch.newOrder({ apiKey, secretKey, params, body, method: "POST" });
};

const cancelOrder = (apiKey, secretKey) => symbol => {
  if (!symbol) throw new Error("newOrder method required 'symbol' parameter");

  const params = `timestamp=${Date.now()}&symbol=${symbol}`;

  return fetch.newOrder({ apiKey, secretKey, params, method: "DELETE" });
};

export default (apiKey, secretKey) => {
  return {
    info: info(apiKey, secretKey),
    myTrades: myTrades(apiKey, secretKey),
    openOrders: openOrders(apiKey, secretKey),
    newOrder: newOrder(apiKey, secretKey),
    cancelOrder: cancelOrder(apiKey, secretKey)
  };
};
