import { ParamsMapping, RoutingConfig } from '@spartacus/core';
import { ROUTE_PARAMS } from '../route-params';

//rename to /organization/account-summary-units/
const listPath = `organization/account-summary`;
const paramsMapping: ParamsMapping = {
  unitCode: 'uid',
  addressId: 'id',
  userCode: 'customerId',
};

export const defaultAccountSummaryRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgAccountSummary: {
        paths: [`${listPath}`],
      },
      orgAccountSummaryDetails: {
        paths: [`${listPath}/account-summary-details/:${ROUTE_PARAMS.unitCode}`],
        paramsMapping,
      },
    },
  },
};
