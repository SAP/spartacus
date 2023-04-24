/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

/**
 * The endpoints to call from the OCC adapter for stock levels.
 */
export const defaultOccOpfOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        placeOpfOrder: 'users/${userId}/orders/v2',
      },
    },
  },
};
