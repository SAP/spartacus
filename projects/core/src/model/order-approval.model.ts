import { Principal } from './cart.model';
import { Order } from './order.model';
import { OrderApprovalPermissionType } from './permission.model';

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

export interface Trigger {
  activationTime?: string;
  displayTimeTable?: string;
}

export interface OrderApproval {
  approvalDecisionRequired?: boolean;
  code?: string;
  customerOrderApprovalRecords?: OrderApprovalRecord[];
  merchantOrderApprovalRecords?: OrderApprovalRecord[];
  order?: Order;
  trigger?: Trigger;
}

export interface OrderApprovalPermissionResult {
  approverName: string;
  approverNotes: string;
  permissionType: OrderApprovalPermissionType;
  statusDisplay: string;
}
