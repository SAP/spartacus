// SPIKE TODO: DON'T MERGE IT

// PROXY SERVER FOR DELAYING SOME OCC BACKEND RESPONSES
// ONLY FOR TESTING PURPOSES

const httpProxy = require('http-proxy');
const http = require('http');

const proxy = httpProxy.createProxyServer({ secure: false });

const ENDPOINT_FOR_DELAY = 'components';
const BACKEND_BASE_URL = 'https://40.76.109.9:9002';
const DELAY = 6_000;

/** custom predicate, whether we should delay a request */
const shouldDelay = (req) => {
  // Note: In browser there are 2 requests: preflight (OPTIONS) and actual request (GET).

  const result = req.url.includes(ENDPOINT_FOR_DELAY);
  result && console.log({ delay: DELAY, url: req.url });
  return result;
};

http
  .createServer(function (req, res) {
    const forwardRequest = () =>
      proxy.web(req, res, { target: BACKEND_BASE_URL });
    const delay = shouldDelay(req) ? DELAY : 0;
    setTimeout(forwardRequest, delay);
  })
  .listen(9002);
