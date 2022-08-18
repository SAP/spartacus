import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import { ORDER_FEATURE } from '@spartacus/order/root';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { ORGANIZATION_UNIT_ORDER_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrganizationUnitOrderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_UNIT_ORDER_FEATURE]: {
        cmsComponents: ['UnitLevelOrderHistoryComponent'],
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
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultOrganizationUnitOrderComponentsConfig),
    provideDefaultConfig(<RoutingConfig>{
      routing: {
        routes: {
          unitLevelOrders: {
            paths: ['my-account/unitLevelOrders'],
          },
        },
      },
    }),
  ],
})
export class UnitOrderRootModule {}
