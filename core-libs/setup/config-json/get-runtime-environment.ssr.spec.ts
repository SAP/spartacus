/**
 * @jest-environment node
 *
 * Tests for getRuntimeEnvironment() in a Node (SSR) environment where
 * `document` is genuinely undefined — cannot be tested in the jsdom suite.
 */

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  getRuntimeEnvironment,
  isBrowserContext,
} from './get-runtime-environment';

describe('getRuntimeEnvironment (Node/SSR environment)', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    (globalThis as any).fetch = fetchMock;
  });

  afterEach(() => {
    delete (globalThis as any).fetch;
  });

  it('isBrowserContext should return false when document is undefined', () => {
    expect(typeof document).toBe('undefined');
    expect(isBrowserContext()).toBe(false);
  });

  it('should return empty runtimeEnvironment without fetching when document is undefined', async () => {
    // In this @jest-environment node suite, `document` is genuinely undefined —
    // no global mutation needed. This matches exactly what happens in SSR when
    // main.ts calls getRuntimeEnvironment() on the Node server before bootstrap.
    const result = await getRuntimeEnvironment({ url: '/config.json' });

    expect(result.runtimeEnvironment).toEqual({});
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
