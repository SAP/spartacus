import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { LayoutConfig } from 'projects/storefrontlib/layout';
import { CpqConfiguratorPageLayouHandler } from './cpq-configurator-page-layout-handler';

/**
 *  Contains the layout configuration for the CPQ configurator pages. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorInteractiveModule is active
 */
@NgModule({
  providers: [
    provideDefaultConfig(<LayoutConfig>{
      layoutSlots: {
        CpqConfigurationTemplate: {
          header: {
            md: {
              slots: ['SiteLogo', 'MiniCart'],
            },
            xs: {
              slots: ['SiteLogo', 'MiniCart'],
            },
          },

          navigation: {
            lg: { slots: [] },
            slots: ['CpqConfigMenu'],
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

    {
      provide: PAGE_LAYOUT_HANDLER,
      useExisting: CpqConfiguratorPageLayouHandler,
      multi: true,
    },
  ],
})
export class CpqConfiguratorLayoutModule {}
