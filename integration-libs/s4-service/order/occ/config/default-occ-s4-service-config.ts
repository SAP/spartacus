/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';
import { OrderOccEndpoints } from '@spartacus/order/occ';

const defaultB2bOrderOccEndpoints: OrderOccEndpoints = {
  cancelServiceOrder:
    'users/${userId}/orders/${code}/serviceOrder/cancellation',
};
export const defaultOccServiceOrderConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: { ...defaultB2bOrderOccEndpoints },
    },
  },
};
