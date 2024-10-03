/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { FutureStockOccEndpoints } from '../model/occ-future-stock-endpoints.model';

const futureStockEndpoints: FutureStockOccEndpoints = {
  futureStock: 'users/${userId}/futureStocks/${productCode}',
  futureStocks: 'users/${userId}/futureStocks',
};

export const defaultOccFutureStockConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        ...futureStockEndpoints,
      },
    },
  },
};
