import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CmsPageGuard,
  HamburgerMenuModule,
  LayoutConfig,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { defaultCpqInteractiveRoutingConfig } from './default-cpq-interactive-routing-config';

/**
 * Takes care of the interactive configuration process (the user enters new attribute values and navigates through the configuration).
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // We can neither omit the path nor set to undefined
        // @ts-ignore
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
    provideDefaultConfig(defaultCpqInteractiveRoutingConfig),
    provideDefaultConfig(<LayoutConfig>{
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
            lg: { slots: [] },
            slots: ['SiteLogin', 'SiteContext', 'SiteLinks', 'CpqConfigMenu'],
          },

          lg: {
            slots: [
              'CpqConfigHeader',
              'CpqConfigBanner',
              'CpqConfigMenu',
              'CpqConfigContent',
              'CpqConfigOverviewBanner',
              'CpqConfigOverviewContent',
              'CpqConfigBottombar',
            ],
          },

          slots: [
            'CpqConfigHeader',
            'CpqConfigBanner',
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
