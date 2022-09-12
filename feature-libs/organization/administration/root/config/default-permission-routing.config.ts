/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ParamsMapping, RoutingConfig } from '@commerce-storefront-toolset/core';
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
