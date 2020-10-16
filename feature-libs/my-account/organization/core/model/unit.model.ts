import { B2BUser } from '@spartacus/core';
import { B2BApprovalProcess } from './order-approval.model';

declare module '@spartacus/core' {
  interface B2BUnit {
    parentOrgUnit?: Partial<B2BUnit>;
    approvalProcess?: B2BApprovalProcess;
    administrators?: B2BUser[];
    approvers?: B2BUser[];
    customers?: B2BUser[];
    costCenters?: CostCenter[];
    managers?: B2BUser[];
  }
}
