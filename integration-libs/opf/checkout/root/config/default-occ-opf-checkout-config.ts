/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccOpfCheckoutConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        cartUserEmail:
          'users/${userId}/carts/${cartId}?fields=sapCustomerEmail',
      },
    },
  },
};
