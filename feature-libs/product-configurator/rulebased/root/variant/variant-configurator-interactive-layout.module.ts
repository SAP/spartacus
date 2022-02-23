import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { LayoutConfig } from '@spartacus/storefront';

/**
 *  Contains the layout configuration for the interactive configuration page. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorInteractiveModule is active
 */
@NgModule({
  providers: [
    provideDefaultConfig(<LayoutConfig>{
      layoutSlots: {
        VariantConfigurationTemplate: {
          header: {
            lg: {
              slots: [
                'PreHeader',
                'SiteLogo',
                'VariantConfigExitButton',
                'MiniCart',
              ],
            },
            xs: {
              slots: [
                'PreHeader',
                'SiteLogo',
                'VariantConfigExitButton',
                'MiniCart',
              ],
            },
          },

          navigation: {
            lg: { slots: [] },
            slots: ['VariantConfigMenu'],
          },

          lg: {
            slots: [
              'VariantConfigHeader',
              'VariantConfigMenu',
              'VariantConfigContent',
              'VariantConfigBottombar',
            ],
          },

          slots: [
            'VariantConfigHeader',
            'VariantConfigContent',
            'VariantConfigBottombar',
          ],
        },
      },
    }),
  ],
})
export class VariantConfiguratorInteractiveLayoutModule {}
