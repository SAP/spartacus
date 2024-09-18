import { Server } from 'http';
import { expectLogMessages } from './matchers/matchers';
import * as HttpUtils from './utils/http.utils';
import * as LogUtils from './utils/log.utils';
import * as ProxyUtils from './utils/proxy.utils';
import * as SsrUtils from './utils/ssr.utils';

const BACKEND_BASE_URL: string = process.env.CX_BASE_URL || '';

jest.setTimeout(SsrUtils.DEFAULT_SSR_TIMEOUT); // set timeout to at least 1x DEFAULT_SSR_TIMEOUT seconds for each test in this file to increase stability of the tests

describe('SSR E2E', () => {
  let backendProxy: Server;
  const REQUEST_PATH = '/contact'; // path to the page that is less "busy" than the homepage

  beforeEach(() => {
    LogUtils.clearSsrLogFile();
  });

  afterEach(async () => {
    backendProxy.close();
    await SsrUtils.killSsrServer();
  });

  describe('With SSR error handling', () => {
    describe('Common behavior', () => {
      beforeEach(async () => {
        await SsrUtils.startSsrServer();
      });

      it('should receive success response with request', async () => {
        backendProxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
        });
        const response: any =
          await HttpUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(200);

        expectLogMessages().toContainLogs([
          `Rendering started (${REQUEST_PATH})`,
          `Request is waiting for the SSR rendering to complete (${REQUEST_PATH})`,
        ]);
      });

      it('should receive response with 404 when page does not exist', async () => {
        backendProxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
        });
        const response = await HttpUtils.sendRequestToSsrServer(
          REQUEST_PATH + 'not-existing-page'
        );
        expect(response.statusCode).toEqual(404);
      });

      it('should receive response with status 404 if HTTP error occurred when calling cms/pages API URL', async () => {
        backendProxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
          callback: (proxyRes, req) => {
            if (req.url?.includes('cms/pages')) {
              proxyRes.statusCode = 404;
            }
          },
        });
        const response = await HttpUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(404);
      });

      it('should receive response with status 500 if HTTP error occurred when calling other than cms/pages API URL', async () => {
        backendProxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
          callback: (proxyRes, req) => {
            if (req.url?.includes('cms/components')) {
              proxyRes.statusCode = 404;
            }
          },
        });
        const response = await HttpUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(500);
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
          response = await HttpUtils.sendRequestToSsrServer(REQUEST_PATH);
          expect(response.statusCode).toEqual(200);

          expectLogMessages().toContainLogs([
            `Rendering started (${REQUEST_PATH})`,
            `Request is waiting for the SSR rendering to complete (${REQUEST_PATH})`,
          ]);

          response = await HttpUtils.sendRequestToSsrServer(REQUEST_PATH);
          expect(response.statusCode).toEqual(200);
          expectLogMessages().toContain(`Render from cache (${REQUEST_PATH})`);
        },
        2 * SsrUtils.DEFAULT_SSR_TIMEOUT // increase timeout for this test as it calls the SSR server twice
      );

      it(
        'should render for the next request if previous render failed',
        async () => {
          backendProxy = await ProxyUtils.startBackendProxyServer({
            target: BACKEND_BASE_URL,
            callback: (proxyRes, req) => {
              if (req.url?.includes('cms/pages')) {
                proxyRes.statusCode = 404;
              }
            },
          });
          let response: HttpUtils.SsrResponse;
          response = await HttpUtils.sendRequestToSsrServer(REQUEST_PATH);
          expect(response.statusCode).toEqual(404);

          response = await HttpUtils.sendRequestToSsrServer(REQUEST_PATH);
          expect(response.statusCode).toEqual(404);
          expectLogMessages().not.toContain(
            `Render from cache (${REQUEST_PATH})`
          );
        },
        2 * SsrUtils.DEFAULT_SSR_TIMEOUT // increase timeout for this test as it calls the SSR server twice
      );
    });
  });
});
