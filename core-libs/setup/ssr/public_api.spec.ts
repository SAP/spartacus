/** @jest-environment node */

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as ssrApi from '@spartacus/setup/ssr';
import { MessageChannel } from 'node:worker_threads';

describe('SSR Jest environment', () => {
  let channel: MessageChannel;

  beforeEach(() => {
    channel = new MessageChannel();
  });

  afterEach(() => {
    channel.port1.close();
    channel.port2.close();
  });

  it('supports native message-port callbacks', async () => {
    const { port1, port2 } = channel;
    const message = new Promise<string>((resolve) => {
      port1.once('message', resolve);
    });
    port2.postMessage('ssr');

    await expect(message).resolves.toBe('ssr');
  });
});

describe('@spartacus/setup/ssr public API', () => {
  it.each([
    'ConcurrencyLimitError',
    'DefaultBaseSiteResolver',
    'OccUnavailableError',
    'configureBaseSiteAwareRoutes',
    'extractOccBaseUrlFromHtml',
    'setBaseSiteHandler',
  ])('keeps %s in the express-base-site entry point', (name) => {
    expect(ssrApi).not.toHaveProperty(name);
  });
});
