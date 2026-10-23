/** @jest-environment node */

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as ssrApi from '@spartacus/setup/ssr';

describe('@spartacus/setup/ssr public API', () => {
  it('exposes the base-site SSR API from the main entry point', () => {
    expect(ssrApi).toEqual(
      expect.objectContaining({
        ConcurrencyLimitError: expect.any(Function),
        DefaultBaseSiteResolver: expect.any(Function),
        OccUnavailableError: expect.any(Function),
        createBaseSiteAwareRoute: expect.any(Function),
        extractOccBaseUrlFromHtml: expect.any(Function),
        setBaseSiteHandler: expect.any(Function),
      })
    );
  });
});
