/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

/**
 * The endpoints to call from the OCC adapter for stock levels.
 */
export const defaultOccOtpConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        generateOtpKey: 'users/${userId}/carts/${cartId}/otp',
      },
    },
  },
};
