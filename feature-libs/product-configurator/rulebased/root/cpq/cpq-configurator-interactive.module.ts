import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
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
    RouterModule.forChild([
      {
        path: null,
        data: {
          cxRoute: 'configureCLOUDCPQCONFIGURATOR',
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
        CpqConfigurationTemplate: {
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
            slots: ['SiteLogin', 'SiteContext', 'SiteLinks', 'CpqConfigMenu'],
          },

          lg: {
            slots: [
              'CpqConfigHeader',
              'CpqConfigMenu',
              'CpqConfigContent',
              'CpqConfigOverviewBanner',
              'CpqConfigOverviewContent',
              'CpqConfigBottombar',
            ],
          },

          slots: [
            'CpqConfigHeader',
            'CpqConfigContent',
            'CpqConfigOverviewBanner',
            'CpqConfigOverviewContent',
            'CpqConfigBottombar',
          ],
        },
      },
    }),
  ],
})
export class CpqConfiguratorInteractiveModule {}
