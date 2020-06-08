import { OrderApprovalPermissionType } from './permission.model';
import { Principal } from './cart.model';
import { Order } from './order.model';
import { CostCenter } from './org-unit.model';

export interface OrderApprovalDecision {
  // decision: string;
  decision: 'APPROVE' | 'REJECT';
  comment?: string;
}

export interface OrderApprovalRecord {
  approver: Principal;
  comments: string;
  permissionTypes: OrderApprovalPermissionType[];
  statusDisplay: string;
}

export interface B2BOrder extends Order {
  chinesePaymentInfo?: any;
  costCenter?: CostCenter;
  paymentStatus?: string;
  purchaseOrderNumber?: string;
  totalUnitCount?: number;
}

export interface Trigger {
  activationTime: string;
  displayTimeTable: string;
}

export interface OrderApproval {
  approvalDecisionRequired: boolean;
  code: string;
  customerOrderApprovalRecords: OrderApprovalRecord[];
  merchantOrderApprovalRecords: OrderApprovalRecord[];
  order: B2BOrder;
  trigger: Trigger;
}
