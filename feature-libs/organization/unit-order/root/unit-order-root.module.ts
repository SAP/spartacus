/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ORDER_ENTRIES_CONTEXT } from '@spartacus/cart/base/root';
import {
  AuthGuard,
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/root';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { UnitOrderDetailsOrderEntriesContextToken } from './context';
import { ORGANIZATION_UNIT_ORDER_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrganizationUnitOrderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_UNIT_ORDER_FEATURE]: {
        cmsComponents: [
          'UnitLevelOrderHistoryComponent',
          'UnitLevelOrderDetailsOverviewComponent',
          'UnitLevelOrderDetailsItemsComponent',
          'UnitLevelOrderDetailsTotalsComponent',
        ],
        dependencies: [ORDER_FEATURE],
      },
    },
  };

  return config;
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'unitLevelOrders' },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'unitLevelOrderDetail',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: UnitOrderDetailsOrderEntriesContextToken,
          },
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultOrganizationUnitOrderComponentsConfig),
    provideDefaultConfig({
      routing: {
        routes: {
          unitLevelOrders: {
            paths: ['my-account/unitLevelOrders'],
          },
          unitLevelOrderDetail: {
            paths: ['my-account/unitLevelOrderDetails/:orderCode'],
            paramsMapping: { orderCode: 'code' },
          },
        },
      },
    } as RoutingConfig),
  ],
})
export class UnitOrderRootModule {}
