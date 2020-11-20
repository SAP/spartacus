import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ProductModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  HamburgerMenuModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { CpqConfiguratorRestInterceptor } from '../../cpq/cpq-configurator-rest.interceptor';

/**
 * Takes care of the interactive configuration process (the user enters new attribute values and navigates through the configuration).
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots
 */
@NgModule({
  imports: [
    ProductModule,

    RouterModule.forChild([
      {
        path: null,
        data: {
          pageLabel: '/configureCLOUDCPQCONFIGURATOR',
          cxRoute: 'configureCLOUDCPQCONFIGURATOR',
        },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    HamburgerMenuModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CpqConfiguratorRestInterceptor,
      multi: true,
    },

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
              'CpqConfigBottombar',
            ],
          },

          slots: ['CpqConfigHeader', 'CpqConfigContent', 'CpqConfigBottombar'],
        },
      },
    }),
  ],
})
export class CpqConfiguratorInteractiveModule {}
