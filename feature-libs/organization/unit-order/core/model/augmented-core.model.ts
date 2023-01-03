/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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

export interface OrderHistoryQueryParams {
  currentPage?: number;
  sortCode?: string;
  filters?: string;
}
