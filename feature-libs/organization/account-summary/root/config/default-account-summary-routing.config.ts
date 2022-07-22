import { RoutingConfig } from '@spartacus/core';

//rename to /organization/account-summary-units/
const listPath = `organization/account-summary`;

export const defaultAccountSummaryRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgAccountSummary: {
        paths: [`${listPath}`],
      },
      orgAccountSummaryDetails: {
        paths: [`${listPath}/details/:unitCode`],
        paramsMapping: { unitCode: 'uid' },
      },
    },
  },
};
