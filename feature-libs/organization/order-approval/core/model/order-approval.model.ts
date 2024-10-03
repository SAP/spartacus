/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderApprovalPermissionType, Principal } from '@spartacus/core';
import { Order } from '@spartacus/order/root';

export enum OrderApprovalDecisionValue {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}
export interface OrderApprovalDecision {
  decision?: OrderApprovalDecisionValue;
  comment?: string;
}

export interface OrderApprovalRecord {
  approver?: Principal;
  comments?: string;
  permissionTypes?: OrderApprovalPermissionType[];
  statusDisplay?: string;
}

export interface OrderApproval {
  approvalDecisionRequired?: boolean;
  code?: string;
  customerOrderApprovalRecords?: OrderApprovalRecord[];
  merchantOrderApprovalRecords?: OrderApprovalRecord[];
  order?: Order;
  trigger?: OrderApprovalTrigger;
}

export interface OrderApprovalPermissionResult {
  approverName: string;
  approverNotes: string;
  permissionType: OrderApprovalPermissionType;
  statusDisplay: string;
}

export interface OrderApprovalTrigger {
  activationTime?: string;
  displayTimeTable?: string;
}
