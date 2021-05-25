import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import {
  CmsPageGuard,
  LayoutConfig,
  PageLayoutComponent,
} from '@spartacus/storefront';

/**
 * Takes care of the configuration overview that visualizes the attribute value assignments that have been done already in a condensed, read-only form.
 * The end-user can switch between the interactive view and this overview.
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots.
 * Some of the ng components on this view (tab bar, price summary and addToCart button) are shared between the interactive view and the overview.
 */
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // We can neither omit the path nor set to undefined
        // @ts-ignore
        path: null,
        component: PageLayoutComponent,
        data: {
          cxRoute: 'configureOverviewCPQCONFIGURATOR',
        },
        canActivate: [CmsPageGuard],
      },
    ]),
  ],
  providers: [
    provideDefaultConfig(<LayoutConfig>{
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
          slots: [
            'VariantConfigOverviewHeader',
            'VariantConfigOverviewBanner',
            'VariantConfigOverviewContent',
            'VariantConfigOverviewBottombar',
          ],
        },
      },
    }),
  ],
})
export class VariantConfiguratorOverviewModule {}
