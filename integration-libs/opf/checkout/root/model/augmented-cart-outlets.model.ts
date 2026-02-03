/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/cart/base/root';

declare module '@spartacus/cart/base/root' {
  enum CartOutlets {
    OPF_CHECKOUT_PICKUP_ITEMS = 'cx-opf-checkout-pickup-items',
  }
}
