import { OrderApprovalPermissionResult } from './order-approval.model';

declare module '@spartacus/order/root' {
  interface Order {
    permissionResults?: OrderApprovalPermissionResult[];
  }
}
