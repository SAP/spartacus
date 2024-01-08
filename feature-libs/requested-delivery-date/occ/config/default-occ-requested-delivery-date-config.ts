/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccConfig } from '@spartacus/core';

export const defaultOccRequestedDeliveryDateConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        requestedDeliveryDate:
          'users/${userId}/carts/${cartId}/requestedretrievaldate',
      },
    },
  },
};
