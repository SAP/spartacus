import { TestConfig } from '@spartacus/core';
import { Server } from 'http';
import * as HttpUtils from './utils/http.utils';
import * as LogUtils from './utils/log.utils';
import * as ProxyUtils from './utils/proxy.utils';
import * as SsrUtils from './utils/ssr.utils';
const BACKEND_BASE_URL: string = process.env.CX_BASE_URL || '';

jest.setTimeout(SsrUtils.DEFAULT_SSR_TIMEOUT); // set timeout to at least 1x DEFAULT_SSR_TIMEOUT seconds for each test in this file to increase stability of the tests

describe('SSR E2E', () => {
  let backendProxy: Server;
  const REQUEST_PATH = '/contact'; // path to the page that is less "busy" than the homepage

  afterEach(async () => {
    backendProxy?.close();
    await SsrUtils.killSsrServer();
  });

  describe('With SSR error handling', () => {
    describe('Common behavior', () => {
      describe('With default SSR request timeout', () => {
        beforeEach(async () => {
          await SsrUtils.startSsrServer();
        });

        it('should receive success response with request', async () => {
          backendProxy = await ProxyUtils.startBackendProxyServer({
            target: BACKEND_BASE_URL,
          });
          const response: any = await HttpUtils.sendRequestToSsrServer({
            path: REQUEST_PATH,
          });
          expect(response.statusCode).toEqual(200);

          const logsMessages = LogUtils.getLogsMessages();
          expect(logsMessages).toContain(`Rendering started (${REQUEST_PATH})`);
          expect(logsMessages).toContain(
            `Request is waiting for the SSR rendering to complete (${REQUEST_PATH})`
          );
        });

        it('should receive response with 404 when page does not exist', async () => {
          backendProxy = await ProxyUtils.startBackendProxyServer({
            target: BACKEND_BASE_URL,
          });
          const response = await HttpUtils.sendRequestToSsrServer({
            path: REQUEST_PATH + 'not-existing-page',
          });
          expect(response.statusCode).toEqual(404);
        });

        it('should receive response with status 404 if HTTP error occurred when calling cms/pages API URL', async () => {
          backendProxy = await ProxyUtils.startBackendProxyServer({
            target: BACKEND_BASE_URL,
            responseInterceptor: ({ res, req, body }) => {
              if (req.url?.includes('cms/pages')) {
                res.statusCode = 404;
              }
              res.end(body);
            },
          });
          const response = await HttpUtils.sendRequestToSsrServer({
            path: REQUEST_PATH,
          });
          expect(response.statusCode).toEqual(404);
        });

        it('should receive response with status 500 if HTTP error occurred when calling other than cms/pages API URL', async () => {
          backendProxy = await ProxyUtils.startBackendProxyServer({
            target: BACKEND_BASE_URL,
            responseInterceptor: ({ res, req, body }) => {
              if (req.url?.includes('cms/components')) {
                res.statusCode = 404;
              }
              res.end(body);
            },
          });
          const response = await HttpUtils.sendRequestToSsrServer({
            path: REQUEST_PATH,
          });
          expect(response.statusCode).toEqual(500);
        });
      });

      describe('With long SSR request timeout', () => {
        beforeEach(async () => {
          // The SSR in the following tests might take longer than the default SSR request timeout.
          // So to avoid getting a "CSR fallback" response, we're increasing the SSR request timeout to 20 seconds.
          await SsrUtils.startSsrServer({ timeout: 20_000 });
        });

        it('should receive response with status 500 if HTTP call to backend timeouted', async () => {
          /**
           * We're configuring a custom time limit for the Backend API calls in Spartacus.
           * This is to speed up the test. Otherwise, we would need to delay the call to /languages
           * for 20 seconds (which is the default Backend Timeout in Spartacus) to get an error.
           */
          const BACKEND_TIMEOUT_TIME_LIMIT = 4000;
          const API_DELAY = BACKEND_TIMEOUT_TIME_LIMIT + 1;

          backendProxy = await ProxyUtils.startBackendProxyServer({
            target: BACKEND_BASE_URL,
            responseInterceptor: ({ res, req, body }) => {
              // Delay the response from Backend API, but only for for the /languages endpoint.
              // We want Spartacus to consider this Backend API request as Timeouted (therefore failed).
              if (req.url?.includes('languages')) {
                setTimeout(() => res.end(body), API_DELAY);
              } else {
                res.end(body);
              }
            },
          });

          const response = await HttpUtils.sendRequestToSsrServer({
            path: REQUEST_PATH,
            testConfig: {
              backend: { timeout: { server: BACKEND_TIMEOUT_TIME_LIMIT } },
            },
          });

          expect(response.statusCode).toEqual(500);

          const logsMessages = LogUtils.getLogsMessages();
          expect(logsMessages.join('\n')).toMatch(
            new RegExp(
              `Error: Request to URL '[^']*\/languages' exceeded expected time of ${BACKEND_TIMEOUT_TIME_LIMIT}ms and was aborted`
            )
          );
        });
      });
    });

    describe('With caching enabled', () => {
      beforeEach(async () => {
        await SsrUtils.startSsrServer({ cache: true });
      });

      it(
        'should take the response from cache for the next request if previous render succeeded',
        async () => {
          backendProxy = await ProxyUtils.startBackendProxyServer({
            target: BACKEND_BASE_URL,
          });
          let response: HttpUtils.SsrResponse;
          response = await HttpUtils.sendRequestToSsrServer({
            path: REQUEST_PATH,
          });
          expect(response.statusCode).toEqual(200);

          const logsMessages = LogUtils.getLogsMessages();
          expect(logsMessages).toContain(`Rendering started (${REQUEST_PATH})`);
          expect(logsMessages).toContain(
            `Request is waiting for the SSR rendering to complete (${REQUEST_PATH})`
          );

          response = await HttpUtils.sendRequestToSsrServer({
            path: REQUEST_PATH,
          });
          expect(response.statusCode).toEqual(200);
          const logsMessages2 = LogUtils.getLogsMessages();
          expect(logsMessages2).toContain(
            `Render from cache (${REQUEST_PATH})`
          );
        },
        2 * SsrUtils.DEFAULT_SSR_TIMEOUT // increase timeout for this test as it calls the SSR server twice
      );

      it(
        'should render for the next request if previous render failed',
        async () => {
          backendProxy = await ProxyUtils.startBackendProxyServer({
            target: BACKEND_BASE_URL,
            responseInterceptor: ({ res, req, body }) => {
              if (req.url?.includes('cms/pages')) {
                res.statusCode = 404;
              }
              res.end(body);
            },
          });
          let response: HttpUtils.SsrResponse;
          response = await HttpUtils.sendRequestToSsrServer({
            path: REQUEST_PATH,
          });
          expect(response.statusCode).toEqual(404);

          response = await HttpUtils.sendRequestToSsrServer({
            path: REQUEST_PATH,
          });
          expect(response.statusCode).toEqual(404);
          const logsMessages = LogUtils.getLogsMessages();
          expect(logsMessages).not.toContain(
            `Render from cache (${REQUEST_PATH})`
          );
        },
        2 * SsrUtils.DEFAULT_SSR_TIMEOUT // increase timeout for this test as it calls the SSR server twice
      );
    });
  });

  describe('WITHOUT SSR error handling', () => {
    let testConfig: TestConfig;

    beforeEach(() => {
      testConfig = {
        features: {
          propagateErrorsToServer: false,
        },
      };
    });

    describe('Common behavior', () => {
      beforeEach(async () => {
        await SsrUtils.startSsrServer();
      });

      it('should receive success response with request', async () => {
        backendProxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
        });
        const response: any = await HttpUtils.sendRequestToSsrServer({
          path: REQUEST_PATH,
          testConfig,
        });
        expect(response.statusCode).toEqual(200);

        const logsMessages = LogUtils.getLogsMessages();
        expect(logsMessages).toContain(`Rendering started (${REQUEST_PATH})`);
        expect(logsMessages).toContain(
          `Request is waiting for the SSR rendering to complete (${REQUEST_PATH})`
        );
      });

      it('should receive response with 200 even when page does not exist', async () => {
        backendProxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
        });
        const response = await HttpUtils.sendRequestToSsrServer({
          path: REQUEST_PATH + 'not-existing-page',
          testConfig,
        });
        expect(response.statusCode).toEqual(200);
      });

      it('should receive response with status 500 even if HTTP error occurred when calling backend API URL', async () => {
        backendProxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
          responseInterceptor: ({ res, req, body }) => {
            if (req.url?.includes('cms/components')) {
              res.statusCode = 400;
            }
            res.end(body);
          },
        });
        const response = await HttpUtils.sendRequestToSsrServer({
          path: REQUEST_PATH,
          testConfig,
        });
        expect(response.statusCode).toEqual(200);
      });
    });
  });
});
