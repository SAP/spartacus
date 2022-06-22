import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import {
  CUSTOMER_TICKETING_CORE_FEATURE,
  CUSTOMER_TICKETING_FEATURE,
} from './feature-name';
import { defaultSupportTicketRoutingConfig } from './config/default-support-ticket-routing-config';

export function defaultCustomerTicketingComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [CUSTOMER_TICKETING_FEATURE]: {
        cmsComponents: [
          'SupportTicketsHistoryComponent',
          'AddSupportTicketComponent',
          'UpdateSupportTicketComponent',
          'SupportTicketDetailsComponent',
        ],
        // dependencies: [CUSTOMER_TICKETING_FEATURE],
      },

      // by default core is bundled together with components
      [CUSTOMER_TICKETING_CORE_FEATURE]: CUSTOMER_TICKETING_FEATURE,
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
    provideDefaultConfig(defaultSupportTicketRoutingConfig),
  ],
})
export class CustomerTicketingRootModule {}
