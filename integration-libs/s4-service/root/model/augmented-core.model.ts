/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import '@spartacus/order/root';
declare module '@spartacus/order/root' {
  interface Order {
    servicedAt?: string;
  }
}
