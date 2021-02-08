import { OrderApprovalPermissionResult } from './order-approval.model';

declare module '@spartacus/core' {
  interface Order {
    permissionResults?: OrderApprovalPermissionResult[];
  }
}
