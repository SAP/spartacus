const http = require('http');

const REQUEST_OPTIONS = {
  host: 'localhost',
  // port: 4201,
  port: 4000,
};

/**
 * @param {Object} options Setup options for proxy server.
 * @param {string} options.target The url to reroute requests to.
 * @param {number} options.delay Number of seconds to delay requests before sending.
 * @param {number} options.throwStatus Number of status code to set response to.
 */
async function startProxyServer(options) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const forwardRequest = () =>
        proxy.web(req, res, { target: options.target });

      if (options.throwStatus) {
        proxy.on('proxyRes', (proxyRes, req, res) => {
          proxyRes.statusCode = options.throwStatus;
        });
      }

      if (options.delay) {
        setTimeout(forwardRequest, options.delay);
      } else {
        forwardRequest();
      }
    });

    server.listen(9002, () => {
      resolve(server);
    });
  });
}

// TODO: Assert ssr server receives request and sends to proxy server
async function sendRequest(path) {
  return new Promise((resolve) => {
    var req = http.get({ ...REQUEST_OPTIONS, path }, function (res) {
      // Buffer the body entirely for processing as a whole.
      var bodyChunks = [];
      res
        .on('data', function (chunk) {
          bodyChunks.push(chunk);
        })
        .on('end', () => {
          return resolve(res);
        });
    });

    req.on('error', function (e) {
      console.log('ERROR: ' + e.message);
    });
  });
}

module.exports = { startProxyServer, sendRequest };
