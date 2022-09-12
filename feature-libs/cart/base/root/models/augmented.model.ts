/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@commerce-storefront-toolset/storefront';

declare module '@commerce-storefront-toolset/storefront' {
  const enum LAUNCH_CALLER {
    CLEAR_CART = 'CLEAR_CART',
  }
}
