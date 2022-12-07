/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { LayoutConfig, PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { VariantConfiguratorPageLayoutHandler } from './variant-configurator-page-layout-handler';

/**
 *  Contains the layout configuration for the overview configuration page. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorOverviewModule is active
 */
@NgModule({
  providers: [
    provideDefaultConfig(<LayoutConfig>{
      layoutSlots: {
        VariantConfigurationOverviewTemplate: {
          header: {
            slots: ['SiteLogo', 'VariantConfigOverviewExitButton', 'MiniCart'],
          },
          headerDisplayOnly: {
            lg: {
              slots: [
                'SiteContext',
                'SiteLinks',
                'SiteLogo',
                'SearchBox',
                'SiteLogin',
                'MiniCart',
                'NavigationBar',
              ],
            },
            xs: {
              slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
            },
          },
          lg: {
            slots: [
              'VariantConfigOverviewHeader',
              'VariantConfigOverviewBanner',
              'VariantConfigOverviewNavigation',
              'VariantConfigOverviewContent',
              'VariantConfigOverviewBottombar',
            ],
          },
          slots: [
            'VariantConfigOverviewHeader',
            'VariantConfigOverviewBanner',
            'VariantConfigOverviewFilterButton',
            'VariantConfigOverviewContent',
            'VariantConfigOverviewBottombar',
          ],
        },
      },
    }),
    {
      provide: PAGE_LAYOUT_HANDLER,
      useExisting: VariantConfiguratorPageLayoutHandler,
      multi: true,
    },
  ],
})
export class VariantConfiguratorOverviewLayoutModule {}
