// HOW TO RUN IT:
// ```
// npm install -g http-server
// node --watch http-proxy.js
// ```

// WHAT IT DOES:
// [localhost:9002] -proxies all requests to the OCC dev server, generating random `stockLevel`
//                    if the request includes `filters=code:...`, it filters the results

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

hasCodesFilter = (req) => {
  return req.url.includes('?filters=code:');
};

// PROXY SERVER
proxy.on('proxyRes', function (proxyRes, req, res, options) {
  if (hasCodesFilter(req)) {
    // codes that go after`?filters=code:` are separated by `,`
    // lets extract the list of them
    // and let's filter the products in the response
    // Note: the response is a JSON with the `products` array root property
    // PLEASE MIND THAT THERE CAN BE MORE QUERY PARAMS than just `filters=code:...`
    const urlParts = url.parse(req.url, true);
    const queryParams = urlParts.query;
    const codes = queryParams.filters.split(':')[1].split(',');
    let body = '';
    proxyRes.on('data', function (chunk) {
      body += chunk;
    });
    proxyRes.on('end', function () {
      const data = JSON.parse(body);
      data.products = data.products.filter((product) =>
        codes.includes(product.code)
      );

      res.write(JSON.stringify(data));
      res.end();
    });
  } else {
    //pass the original response
    proxyRes.pipe(res);
  }
});

http
  .createServer(function (req, res) {
    proxy.web(req, res, { target: BACKEND_BASE_URL });
  })
  .listen(LISTEN_ON_PORT);
console.log('Proxy server listening on port ' + LISTEN_ON_PORT);
