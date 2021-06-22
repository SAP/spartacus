import { ParamsMapping, RoutingConfig } from '@spartacus/core';
import { ROUTE_PARAMS } from '../route-params';

const listPath = `organization/purchase-limits/:${ROUTE_PARAMS.permissionCode}`;
const paramsMapping: ParamsMapping = {
  permissionCode: 'code',
};

export const defaultPermissionRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      orgPurchaseLimit: {
        paths: ['organization/purchase-limits'],
      },
      orgPurchaseLimitCreate: {
        paths: ['organization/purchase-limits/create'],
      },
      orgPurchaseLimitDetails: {
        paths: [listPath],
        paramsMapping,
      },
      orgPurchaseLimitEdit: {
        paths: [`${listPath}/edit`],
        paramsMapping,
      },
    },
  },
};
