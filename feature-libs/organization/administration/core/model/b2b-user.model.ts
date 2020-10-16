import { B2BUnit as CoreB2BUnit} from '@spartacus/core';

declare module '@spartacus/core' {
  interface B2BUser {
    approvers?: [];
    orgUnit?: CoreB2BUnit;
    selected?: boolean;
    isAssignedToApprovers?: boolean;
    email?: string;
  }
}
