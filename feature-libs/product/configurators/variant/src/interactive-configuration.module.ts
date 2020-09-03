import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ProductModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  CommonConfiguratorModule,
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
        path: null,
        data: {
          pageLabel: '/configureCPQCONFIGURATOR',
          cxRoute: 'configureCPQCONFIGURATOR',
        },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    HamburgerMenuModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
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
  ],
})
export class InteractiveConfigurationModule {}
