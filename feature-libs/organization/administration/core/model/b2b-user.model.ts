declare module '@spartacus/core' {
  interface B2BUser {
    approvers?: [];
    orgUnit?: B2BUnit;
    selected?: boolean;
    isAssignedToApprovers?: boolean;
    email?: string;
  }
}
