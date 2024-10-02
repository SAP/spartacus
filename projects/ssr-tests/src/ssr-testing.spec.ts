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
      beforeEach(async () => {
        await SsrUtils.startSsrServer();
      });

      // SPIKE TODO UNDO - JUST THE TEST THAT FAILED:
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
    });
  });
});
