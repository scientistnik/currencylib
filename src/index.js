import fetch from "./fetch";
import auth from "./account";

export const time = () => fetch.time();
export const exchangeInfo = () => fetch.exchangeInfo();

export const depth = async (symbol, limit) => {
  if (!symbol) throw new Error("depth method required 'symbol' parameter");

  let params = `symbol=${symbol}`;
  if (limit) params += `&limit=${limit}`;

  return fetch.depth({ params });
};

export const aggTrades = async (symbol, startTime, endTime, limit) => {
  if (!symbol) throw new Error("aggTrades method required 'symbol' parameter");

  let params = `symbol=${symbol}`;
  if (startTime) params += `&startTime=${startTime}`;
  if (endTime) params += `&endTime=${endTime}`;
  if (limit) params += `&limit=${limit}`;

  return fetch.aggTrades({ params });
};

export const klines = async (symbol, interval, startTime, endTime, limit) => {
  if (!symbol) throw new Error("klines method required 'symbol' parameter");
  if (!interval) throw new Error(`klines method required 'interval' parameter`);

  let params = `symbol=${symbol}&interval=${interval}`;
  if (startTime) params += `&startTime=${startTime}`;
  if (endTime) params += `&endTime=${endTime}`;
  if (limit) params += `&limit=${limit}`;

  return fetch.klines({ params });
};

export const ticker24hr = symbol => {
  let params = null;

  if (symbol) params = `symbol=${symbol}`;

  return fetch["ticker/24hr"](params ? { params } : undefined);
};

export { auth };
