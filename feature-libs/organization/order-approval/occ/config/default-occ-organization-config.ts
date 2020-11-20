import { OccConfig } from '@spartacus/core';

export const defaultOccOrderApprovalConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        orderApprovals: '/users/${userId}/orderapprovals',
        orderApproval:
          '/users/${userId}/orderapprovals/${orderApprovalCode}?fields=FULL',
        orderApprovalDecision:
          '/users/${userId}/orderapprovals/${orderApprovalCode}/decision',
      },
    },
  },
};
