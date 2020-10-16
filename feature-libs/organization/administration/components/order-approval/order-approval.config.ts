import { RoutingConfig } from '@spartacus/core';

// TODO: this doesn't work with lazy loaded feature
export const orderApprovalRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orderApprovals: {
        paths: ['my-account/approval-dashboard'],
      },
      orderApprovalDetails: {
        paths: ['my-account/approval/:approvalCode'],
        paramsMapping: { approvalCode: 'approvalCode' },
      },
    },
  },
};
