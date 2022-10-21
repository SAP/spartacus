// SPIKE TODO: DON'T MERGE IT

// PROXY SERVER FOR DELAYING SOME OCC BACKEND RESPONSES
// ONLY FOR TESTING PURPOSES

var httpProxy = require('http-proxy');
var http = require('http');

var proxy = httpProxy.createProxyServer({ secure: false });

/** custom predicate, whether we should delay a request */
var shouldDelay = (req) => {
  // Note: Usually there are 2 requests: preflight (OPTIONS) and actual request (GET).
  //
  // The OPTIONS request can return an `etag` header. If it matches
  // with an `etag` remembered in the past by the browser, the actual
  // GET request is not made, but it's instantly "replayed" by the browser
  // based on the disk cache.
  //
  // Because the actual GET request might not happen, we delay the OPTIONS
  // request.

  return req.url.includes(ENDPOINT_FOR_DELAY) && req.method === 'OPTIONS';
};
const BACKEND_BASE_URL = 'https://40.76.109.9:9002';
const DELAY = 10_000;
const ENDPOINT_FOR_DELAY = '/components';

http
  .createServer(function (req, res) {
    const forwardRequest = () =>
      proxy.web(req, res, { target: BACKEND_BASE_URL });
    const delay = shouldDelay(req) ? DELAY : 0;
    setTimeout(forwardRequest, delay);
  })
  .listen(9002);
