import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';

/**
 *  Contains the layout configuration for the CPQ configurator pages. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorInteractiveModule is active
 */
@NgModule({
  providers: [
    provideDefaultConfig(<CmsConfig>{
      layoutSlots: {
        CpqConfigurationTemplate: {
          header: {
            md: {
              slots: ['PreHeader', 'SiteLogo', 'MiniCart'],
            },
            xs: {
              slots: ['PreHeader', 'SiteLogo', 'MiniCart'],
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
  ],
})
export class CpqConfiguratorLayoutModule {}
