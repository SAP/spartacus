import { Order, Principal } from '@spartacus/core';

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

// #9423 it exits in administration model, but not exported, so have to duplicated here
export interface OrderApprovalPermissionType {
  code?: string;
  name?: string;
}
