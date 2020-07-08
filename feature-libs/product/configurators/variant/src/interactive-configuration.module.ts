import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, ProductModule } from '@spartacus/core';
import {
  CmsPageGuard,
  ConfigAddToCartButtonComponent,
  ConfigFormComponent,
  ConfigGroupMenuComponent,
  ConfigGroupTitleComponent,
  ConfigPreviousNextButtonsComponent,
  ConfigurationMessageLoaderModule,
  DefaultMessageConfig,
  HamburgerMenuModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { CommonConfiguratorComponentsModule } from '../../common/src';
import { ConfigPriceSummaryComponent } from '../../common/src/components/config-price-summary/config-price-summary.component';
import { ConfigProductTitleComponent } from '../../common/src/components/config-product-title/config-product-title.component';
import { ConfigTabBarComponent } from '../../common/src/components/config-tab-bar/config-tab-bar.component';

/**
 * Takes care of the interactive configuration process (the user enters new attribute values and navigates through the configuration).
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots
 */
@NgModule({
  imports: [
    ProductModule,
    CommonConfiguratorComponentsModule,
    ConfigurationMessageLoaderModule,
    RouterModule.forChild([
      {
        path: 'configureCPQCONFIGURATOR/:ownerType/entityKey/:entityKey',
        data: { pageLabel: '/configureCPQCONFIGURATOR' },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(DefaultMessageConfig),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationTabBar: {
          component: ConfigTabBarComponent,
        },
        VariantConfigurationTitle: {
          component: ConfigProductTitleComponent,
        },
        VariantConfigurationGroupTitle: {
          component: ConfigGroupTitleComponent,
        },
        VariantConfigurationForm: {
          component: ConfigFormComponent,
        },
        VariantConfigurationMenu: {
          component: ConfigGroupMenuComponent,
        },
        VariantConfigurationPriceSummary: {
          component: ConfigPriceSummaryComponent,
        },
        VariantConfigurationPrevNext: {
          component: ConfigPreviousNextButtonsComponent,
        },
        VariantConfigurationAddToCartButton: {
          component: ConfigAddToCartButtonComponent,
        },
      },
      layoutSlots: {
        VariantConfigurationTemplate: {
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
              slots: [
                'SiteLogin',
                'SiteContext',
                'SiteLinks',
                'VariantConfigMenu',
              ],
            },
          },

          md: {
            slots: [
              'VariantConfigHeader',
              'VariantConfigMenu',
              'VariantConfigContent',
              'VariantConfigBottombar',
            ],
          },
          xs: {
            slots: [
              'VariantConfigHeader',
              'VariantConfigContent',
              'VariantConfigBottombar',
            ],
          },
        },
      },
    }),
    HamburgerMenuModule,
  ],
})
export class InteractiveConfigurationModule {}
