/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const occOrderV2Config: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        placeOrder: 'users/${userId}/orders/v2?fields=FULL',
      },
    },
  },
};
