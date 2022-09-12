/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@commerce-storefront-toolset/core';

declare module '@commerce-storefront-toolset/core' {
  const enum ProductScope {
    BULK_PRICES = 'bulkPrices',
  }
}
