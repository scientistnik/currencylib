import fetch from "cross-fetch";
import sha256 from "js-sha256";
import { BASE_ENDPOINT } from "./constants";

export const baseFetch = ({
  RESTmethod,
  apiKey,
  secretKey,
  params,
  body,
  method
}) => {
  let endpoint = `${BASE_ENDPOINT}/api/v1/${RESTmethod}`;
  let options = undefined;

  if (params) {
    endpoint += `?${params}`;

    if (secretKey) {
      endpoint += `&signature=${sha256.hmac(
        secretKey,
        body ? params + body : params
      )}`;

      options = {
        headers: { "X-MBX-APIKEY": apiKey }
      };

      if (body) options.body = body;
      if (method && ["POST", "DELETE"].includes(method))
        options.method = method;
    }
  }

  return fetch(endpoint, options).then(async res => {
    if (res.status >= 400)
      throw new Error(
        `Bad response from server, ${res.status} ${res.statusText}`
      );

    let json = await res.json();

    if (json.code) throw new Error(`Error endpoint, ${JSON.stringify(json)}`);

    return json;
  });
};

export default new Proxy(
  {},
  {
    get: (_, RESTmethod) => {
      if (typeof RESTmethod === "symbol") return baseFetch;

      return args => baseFetch({ RESTmethod, ...args });
    }
  }
);
