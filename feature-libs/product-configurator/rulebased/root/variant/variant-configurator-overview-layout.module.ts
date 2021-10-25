import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { LayoutConfig } from '@spartacus/storefront';

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
            md: {
              slots: [
                'SiteLogo',
                'VariantConfigOverviewExitButton',
                'MiniCart',
              ],
            },
            xs: {
              slots: [
                'SiteLogo',
                'VariantConfigOverviewExitButton',
                'MiniCart',
              ],
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
export class VariantConfiguratorOverviewLayoutModule {}
