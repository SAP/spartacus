import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import {
  CommonConfiguratorComponentsModule,
  ConfigPriceSummaryComponent,
  ConfigTabBarComponent,
} from '@spartacus/product/configurators/common';
import {
  CmsPageGuard,
  ConfigAddToCartButtonComponent,
  ConfigOverviewFormComponent,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { ConfigureErrorNotificationBannerComponent } from '../../../../../projects/storefrontlib/src/cms-components/configurator/generic/configure-error-notification-banner/configure-error-notification-banner.component';

/**
 * Takes care of the configuration overview that visualizes the attribute value assignments that have been done already in a condensed, read-only form.
 * The end-user can switch between the interactive view and this overview.
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots.
 * Some of the ng components on this view (tab bar, price summary and addToCart button) are shared between the interactive view and the overview.
 */
@NgModule({
  imports: [
    CommonConfiguratorComponentsModule,
    RouterModule.forChild([
      {
        path:
          'configureOverviewCPQCONFIGURATOR/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
        component: PageLayoutComponent,
        data: { pageLabel: '/configureOverviewCPQCONFIGURATOR' },
        canActivate: [CmsPageGuard],
      },
      {
        path:
          'configureOverviewCPQCONFIGURATOR/:ownerType/entityKey/:entityKey',
        component: PageLayoutComponent,
        data: { pageLabel: '/configureOverviewCPQCONFIGURATOR' },
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationTabBar: {
          component: ConfigTabBarComponent,
        },
        VariantConfigurationErrorNotificationBanner: {
          component: ConfigureErrorNotificationBannerComponent,
        },
        VariantConfigurationOverview: {
          component: ConfigOverviewFormComponent,
        },
        VariantConfigurationPriceSummary: {
          component: ConfigPriceSummaryComponent,
        },
        VariantConfigurationAddToCartButton: {
          component: ConfigAddToCartButtonComponent,
        },
      },
      layoutSlots: {
        VariantConfigurationOverviewTemplate: {
          header: {
            md: {
              slots: [
                'PreHeader',
                'SiteContext',
                'SiteLinks',
                'SiteLogo',
                'SearchBox',
                'SiteLogin',
                'MiniCart',
              ],
            },
            xs: {
              slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
            },
          },

          navigation: {
            xs: {
              slots: ['SiteLogin', 'SiteContext', 'SiteLinks'],
            },
          },

          md: {
            slots: [
              'VariantConfigOverviewHeader',
              'VariantConfigOverviewBanner',
              'VariantConfigOverviewContent',
              'VariantConfigOverviewBottombar',
            ],
          },
          xs: {
            slots: [
              'VariantConfigOverviewHeader',
              'VariantConfigOverviewBanner',
              'VariantConfigOverviewContent',
              'VariantConfigOverviewBottombar',
            ],
          },
        },
      },
    }),
  ],
})
export class OverviewModule {}
