// HOW TO RUN IT:
// ```
// npm install -g http-server
// node --watch http-proxy.js
// ```

// WHAT IT DOES:
// [localhost:9002] -proxies all requests to the OCC dev server, generating random `stockLevel`
//                    if the request includes `fields=stock`. Random stock level is between 1-100.
// [localhost:9003] - also runs a fake server that returns random stock levels between 100_001-100_100.

const httpProxy = require('http-proxy');
const http = require('http');
const url = require('url');

const proxy = httpProxy.createProxyServer({
  secure: false,
  changeOrigin: true,
  selfHandleResponse: true,
});

const BACKEND_BASE_URL = 'https://40.76.109.9:9002'; // OCC dev server
const LISTEN_ON_PORT = 9002;

/**
 * returns true if the request includes `fields=stock`
 */
isStockRequest = (req) => {
  const { query } = url.parse(req.url, true);
  return query?.fields?.includes('stock');
};

/**
 * returns random number between 1-100
 */
getRandom = () => Math.floor(Math.random() * 100) + 1;

// PROXY SERVER
proxy.on('proxyRes', function (proxyRes, req, res) {
  var body = [];
  proxyRes.on('data', function (chunk) {
    body.push(chunk);
  });
  proxyRes.on('end', function () {
    body = Buffer.concat(body).toString();

    if (isStockRequest(req)) {
      try {
        const object = JSON.parse(body);
        object.spike_modified = true;

        object.stock.stockLevel = getRandom();
        console.log('Proxy mutated the stock level:', object.stock.stockLevel);

        body = JSON.stringify(object);
      } catch (error) {
        console.error('Error parsing body:', { url: req.url, error, body });
      }
    }

    // simulate artificial delay in response
    setTimeout(() => {
      res.end(body);
    }, 1000);
  });
});

// FAKE SERVER
http
  .createServer(function (req, res) {
    proxy.web(req, res, { target: BACKEND_BASE_URL });
  })
  .listen(LISTEN_ON_PORT);
console.log('Proxy server listening on port ' + LISTEN_ON_PORT);

FAKE_LISTEN_ON_PORT = 9003;
http
  .createServer(function (req, res) {
    // respond with JSON object
    const spikeResponse = {
      stock: {
        stockLevel: getRandom() + 100_000,
        stockLevelStatus: 'inStock',
        isValueRounded: false,
      },
    };
    console.log(
      'Fake server generated stock level:',
      spikeResponse.stock.stockLevel
    );
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // simulate artificial delay in response
    setTimeout(() => {
      res.end(JSON.stringify(spikeResponse));
    }, 1000);
  })
  .listen(FAKE_LISTEN_ON_PORT);
console.log('Spike server listening on port ' + FAKE_LISTEN_ON_PORT);
