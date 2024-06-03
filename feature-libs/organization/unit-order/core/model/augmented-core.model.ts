/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { B2BUnit, B2BUser } from '@spartacus/core';

declare module '@spartacus/order/root' {
  interface OrderHistory {
    orgUnit?: B2BUnit;
    orgCustomer?: B2BUser;
  }
}
