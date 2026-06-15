/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as HttpUtils from './utils/http.utils';
import * as LogUtils from './utils/log.utils';
import * as SsrUtils from './utils/ssr.utils';

jest.setTimeout(SsrUtils.DEFAULT_SSR_TIMEOUT);

describe('SSR /robots.txt', () => {
  beforeAll(async () => {
    await SsrUtils.startSsrServer();
  });

  afterAll(async () => {
    await SsrUtils.killSsrServer();
  });

  it('should return 200 with Content-Type text/plain', async () => {
    const response = await HttpUtils.sendRequestToSsrServer({
      path: '/robots.txt',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toContain('text/plain');
  });

  it('should return body containing User-agent directive', async () => {
    const response = await HttpUtils.sendRequestToSsrServer({
      path: '/robots.txt',
    });

    expect(response.body).toContain('User-agent');
  });

  it('should not return HTML', async () => {
    const response = await HttpUtils.sendRequestToSsrServer({
      path: '/robots.txt',
    });

    expect(response.body).not.toContain('<!doctype html>');
    expect(response.body).not.toContain('<app-root>');
  });

  it('should not trigger Angular SSR rendering', async () => {
    await HttpUtils.sendRequestToSsrServer({ path: '/robots.txt' });

    const logsMessages = LogUtils.getLogsMessages();
    expect(logsMessages).not.toContain('Rendering started (/robots.txt)');
  });

  it('should return Cache-Control: public, max-age=3600', async () => {
    const response = await HttpUtils.sendRequestToSsrServer({
      path: '/robots.txt',
    });

    expect(response.headers['cache-control']).toContain('public');
    expect(response.headers['cache-control']).toContain('max-age=3600');
  });
});
