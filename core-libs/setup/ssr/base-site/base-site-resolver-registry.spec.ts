/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  configureBaseSiteResolver,
  getConfiguredBaseSiteResolver,
  resetBaseSiteResolver,
} from './base-site-resolver-registry';

describe('base-site resolver registry', () => {
  afterEach(() => {
    resetBaseSiteResolver();
  });

  it('returns a resolver after configuring', () => {
    configureBaseSiteResolver({ baseSites: ['x'] });
    const resolver = getConfiguredBaseSiteResolver();
    expect(resolver.resolveFromPath('https://h/x/llms.txt')).toBe('x');
  });

  it('throws when no resolver has been configured', () => {
    expect(() => getConfiguredBaseSiteResolver()).toThrow();
  });

  it('throws after resetBaseSiteResolver()', () => {
    configureBaseSiteResolver({ baseSites: ['x'] });
    resetBaseSiteResolver();
    expect(() => getConfiguredBaseSiteResolver()).toThrow();
  });
});
