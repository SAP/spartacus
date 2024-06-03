/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderApprovalPermissionResult } from './order-approval.model';

declare module '@spartacus/order/root' {
  interface Order {
    permissionResults?: OrderApprovalPermissionResult[];
  }
}
