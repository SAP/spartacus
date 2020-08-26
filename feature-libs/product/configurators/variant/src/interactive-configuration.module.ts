import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, ConfigModule, ProductModule } from '@spartacus/core';
import {
  CommonConfiguratorModule,
  ConfigAddToCartButtonComponent,
  ConfigGroupMenuComponent,
  ConfigurationMessageLoaderModule,
} from '@spartacus/product/configurators/common';
import {
  CmsPageGuard,
  HamburgerMenuModule,
  PageLayoutComponent,
} from '@spartacus/storefront';

/**
 * Takes care of the interactive configuration process (the user enters new attribute values and navigates through the configuration).
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots
 */
@NgModule({
  imports: [
    ProductModule,
    CommonConfiguratorModule,
    ConfigurationMessageLoaderModule,
    RouterModule.forChild([
      {
        path: 'configureCPQCONFIGURATOR/:ownerType/entityKey/:entityKey',
        data: { pageLabel: '/configureCPQCONFIGURATOR' },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationMenu: {
          component: ConfigGroupMenuComponent,
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
