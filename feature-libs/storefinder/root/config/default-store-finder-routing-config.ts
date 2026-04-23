/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0Brea
 */

import { RoutingConfig } from '@spartacus/core';

export const defaultStoreFinderRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      storeFinder: {
        paths: ['store-finder'],
      },
      storeFinderFind: {
        paths: ['store-finder/find'],
      },
      storeFinderViewAll: {
        paths: ['store-finder/view-all'],
      },
      storeFinderCountry: {
        paths: ['store-finder/country/:country'],
      },
      storeFinderRegion: {
        paths: ['store-finder/country/:country/region/:region'],
      },
      storeFinderStore: {
        paths: [
          'store-finder/country/:country/region/:region/:store',
          'store-finder/country/:country/:store',
        ],
      },
    },
  },
};
