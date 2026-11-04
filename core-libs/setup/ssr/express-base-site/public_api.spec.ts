/** @jest-environment node */

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as expressBaseSiteApi from '@spartacus/setup/ssr/express-base-site';

describe('@spartacus/setup/ssr/express-base-site public API', () => {
  it('exposes the base-site-aware Express route API', () => {
    expect(expressBaseSiteApi).toEqual(
      expect.objectContaining({
        ConcurrencyLimitError: expect.any(Function),
        DefaultBaseSiteResolver: expect.any(Function),
        OccUnavailableError: expect.any(Function),
        configureBaseSiteAwareRoutes: expect.any(Function),
        extractOccBaseUrlFromHtml: expect.any(Function),
        setBaseSiteHandler: expect.any(Function),
      })
    );
  });
});
