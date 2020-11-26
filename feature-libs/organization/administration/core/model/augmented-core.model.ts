import { B2BApprovalProcess, Currency } from '@spartacus/core';

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

  interface B2BUser {
    approvers?: [];
    orgUnit?: B2BUnit;
    selected?: boolean;
    isAssignedToApprovers?: boolean;
    email?: string;
  }

  interface CostCenter {
    activeFlag?: boolean;
    currency?: Currency;
    originalCode?: string;
  }
}
