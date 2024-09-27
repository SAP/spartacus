import * as http from 'http';
const httpProxy = require('http-proxy');

// backend-proxy.ts
// USAGE
// npx nodemon backend-proxy.ts

/**
 * Options to start a proxy server.
 */
interface ProxyOptions {
  /**
   * The url to reroute requests to.
   */
  target: string;

  requestInterceptor?: (params: {
    req: http.IncomingMessage;
    res: http.ServerResponse;

    /**
     * A function to forward the request to the original target.
     */
    forward: () => void;
  }) => void;

  responseInterceptor?: (params: {
    /**
     * The body of the response from the upstream server.
     *
     * Note: we're exposing separately from the `proxyRes` object for convenience
     *       (because extracting it manually from `proxyRes` is very cumbersome)
     */
    body: string;

    /**
     * The response from the upstream server.
     */
    proxyRes: http.IncomingMessage;

    /**
     * The request that was sent to the upstream server.
     */
    req: http.IncomingMessage;

    /**
     * The response that will be sent to the client.
     */
    res: http.ServerResponse;
  }) => void;
}
export async function startBackendProxyServer(
  options: ProxyOptions
): Promise<http.Server> {
  const proxy = httpProxy.createProxyServer({
    secure: false,
    selfHandleResponse: !!options.responseInterceptor,
  });
  if (options.responseInterceptor) {
    proxy.on(
      'proxyRes',
      (
        proxyRes: http.IncomingMessage,
        req: http.IncomingMessage,
        res: http.ServerResponse
      ) => {
        // We have to buffer the response body before passing it to the interceptor
        let bodyBuffer: Buffer[] = [];
        proxyRes.on('data', (chunk) => {
          bodyBuffer.push(chunk);
        });
        proxyRes.on('end', () => {
          const body = Buffer.concat(bodyBuffer).toString();

          // Pass the body to the interceptor
          if (options.responseInterceptor) {
            options.responseInterceptor({
              body,
              proxyRes,
              res,
              req,
            });
          } else {
            res.end(body);
          }
        });
      }
    );
  }

  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const forward = () => {
        proxy.web(req, res, { target: options.target });
      };
      if (options.requestInterceptor) {
        options.requestInterceptor({ req, res, forward });
      } else {
        forward();
      }
    });

    server.listen(9002, () => {
      resolve(server);
      console.log('Backend proxy server started on port 9002');
    });
  });
}

startBackendProxyServer({
  target: 'https://40.76.109.9:9002',
  requestInterceptor: ({ req, forward }) => {
    if (req?.url?.includes('spike-new-availability-api')) {
      req.url = req.url.replace(
        'spike-new-availability-api?lang=en&curr=USD',
        'products/300938?fields=stock(DEFAULT)'
      );
      console.log(req.url);
      setTimeout(forward, 3_000); // SPIKE DELAY CALL FOR STOCK
    } else {
      forward();
    }
  },
});
