/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccOpfPaymentConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        setCartPaymentOption: 'users/${userId}/carts/${cartId}/paymentOption',
      },
    },
  },
};
