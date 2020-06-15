import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import {
  CmsPageGuard,
  ConfigAddToCartButtonComponent,
  ConfigOverviewFormComponent,
  ConfigPriceSummaryComponent,
  ConfigTabBarComponent,
  PageLayoutComponent,
} from '@spartacus/storefront';

@NgModule({
  imports: [
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
          guards: [],
        },
        VariantConfigurationOverview: {
          component: ConfigOverviewFormComponent,
          guards: [],
        },
        VariantConfigurationPriceSummary: {
          component: ConfigPriceSummaryComponent,
          guards: [],
        },
        VariantConfigurationAddToCartButton: {
          component: ConfigAddToCartButtonComponent,
          guards: [],
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
              'VariantConfigOverviewContent',
              'VariantConfigOverviewBottombar',
            ],
          },
          xs: {
            slots: [
              'VariantConfigOverviewHeader',
              'VariantConfigOverviewContent',
              'VariantConfigOverviewBottombar',
            ],
          },
        },
      },
    }),
  ],

  declarations: [],
  exports: [],
  entryComponents: [],
})
export class OverviewModule {}
