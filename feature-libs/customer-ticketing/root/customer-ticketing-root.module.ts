/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultCustomerTicketingConfig } from './config';
import { defaultCustomerTicketingRoutingConfig } from './config/default-customer-ticketing-routing-config';
import {
  CUSTOMER_TICKETING_CORE_FEATURE,
  CUSTOMER_TICKETING_FEATURE,
} from './feature-name';
import { CustomerTicketingEventModule } from './events/customer-ticketing-event.module';

export function defaultCustomerTicketingComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [CUSTOMER_TICKETING_FEATURE]: {
        cmsComponents: [
          'SupportTicketHistoryComponent',
          'SupportTicketUpdateComponent',
          'SupportTicketDetailsComponent',
          'SupportTicketReopenComponent',
          'SupportTicketCloseComponent',
          'MyAccountViewRequestsComponent',
        ],
      },

      // by default core is bundled together with components
      [CUSTOMER_TICKETING_CORE_FEATURE]: CUSTOMER_TICKETING_FEATURE,
    },
  };
  return config;
}
@NgModule({
  imports: [
    CustomerTicketingEventModule,
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'supportTicketDetails',
        },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'supportTickets',
        },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultCustomerTicketingComponentsConfig),
    provideDefaultConfig(defaultCustomerTicketingRoutingConfig),
    provideDefaultConfig(defaultCustomerTicketingConfig),
  ],
})
export class CustomerTicketingRootModule {}
