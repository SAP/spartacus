import { Server } from 'http';
import { expectLogMessages } from './matchers/matchers';
import * as LogUtils from './utils/log.utils';
import * as ProxyUtils from './utils/proxy.utils';
import * as SsrUtils from './utils/ssr.utils';

const BACKEND_BASE_URL: string = process.env.CX_BASE_URL || '';

describe('SSR E2E', () => {
  let proxy: Server;
  const REQUEST_PATH = '/electronics-spa/en/USD/';

  beforeEach(() => {
    LogUtils.clearSsrLogFile();
  });

  afterEach(async () => {
    proxy.close();
    await SsrUtils.killSsrServer();
  });

  describe('With SSR error handling', () => {
    describe('Common behavior', () => {
      beforeEach(async () => {
        await SsrUtils.startSsrServer();
      });

      it('should receive success response with request', async () => {
        proxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
        });
        const response: any =
          await ProxyUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(200);

        // Rendering should not complete in the first request.
        // App should fall back to csr.
        expectLogMessages().toContainLogs([
          `Rendering started (${REQUEST_PATH})`,
          `Request is waiting for the SSR rendering to complete (${REQUEST_PATH})`,
        ]);
      });

      it('should receive response with 404 when page does not exist', async () => {
        proxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
        });
        const response = await ProxyUtils.sendRequestToSsrServer(
          REQUEST_PATH + 'not-existing-page'
        );
        expect(response.statusCode).toEqual(404);
      });

      it('should receive response with status 404 if HTTP error occurred when calling cms/pages API URL', async () => {
        proxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
          callback: (proxyRes, req) => {
            if (req.url?.includes('cms/pages')) {
              proxyRes.statusCode = 404;
            }
          },
        });
        const response = await ProxyUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(404);
      });

      it('should receive response with status 500 if HTTP error occurred when calling other than cms/pages API URL', async () => {
        proxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
          callback: (proxyRes, req) => {
            if (req.url?.includes('cms/components')) {
              proxyRes.statusCode = 404;
            }
          },
        });
        const response = await ProxyUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(500);
      });
    });

    describe('With caching enabled', () => {
      beforeEach(async () => {
        await SsrUtils.startSsrServer({ cache: true });
      });

      it('should take the response from cache for the next request if previous render succeeded', async () => {
        proxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
        });
        let response: ProxyUtils.SsrResponse;
        response = await ProxyUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(200);

        expectLogMessages().toContainLogs([
          `Rendering started (${REQUEST_PATH})`,
          `Request is waiting for the SSR rendering to complete (${REQUEST_PATH})`,
        ]);

        response = await ProxyUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(200);
        expectLogMessages().toContain(`Render from cache (${REQUEST_PATH})`);
      });

      it('should call rendering for the next request if previous render failed', async () => {
        proxy = await ProxyUtils.startBackendProxyServer({
          target: BACKEND_BASE_URL,
          callback: (proxyRes, req) => {
            if (req.url?.includes('cms/pages')) {
              proxyRes.statusCode = 404;
            }
          },
        });
        let response: ProxyUtils.SsrResponse;
        response = await ProxyUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(404);
        LogUtils.clearSsrLogFile();

        response = await ProxyUtils.sendRequestToSsrServer(REQUEST_PATH);
        expect(response.statusCode).toEqual(404);
        expectLogMessages().not.toContain(
          `Render from cache (${REQUEST_PATH})`
        );
      });
    });
  });
});
