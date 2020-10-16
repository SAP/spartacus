import { B2BUser as CoreB2BUser } from '@spartacus/core';
import { B2BApprovalProcess } from './order-approval.model';

declare module '@spartacus/core' {
  interface B2BUnit {
    parentOrgUnit?: Partial<B2BUnit>;
    approvalProcess?: B2BApprovalProcess;
    administrators?: CoreB2BUser[];
    approvers?: CoreB2BUser[];
    customers?: CoreB2BUser[];
    costCenters?: CostCenter[];
    managers?: CoreB2BUser[];
  }
}
