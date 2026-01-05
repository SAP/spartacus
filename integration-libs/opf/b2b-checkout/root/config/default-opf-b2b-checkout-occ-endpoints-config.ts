/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { OrderOccEndpoints } from '@spartacus/order/occ';

const orderEndpoints: OrderOccEndpoints = {
  placePaymentAuthorizedOrder: 'orgUsers/${userId}/orders?fields=FULL',
};

export const defaultOpfB2bCheckoutOccEndpointsConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...orderEndpoints,
      },
    },
  },
};
