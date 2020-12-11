import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

/**
 * Contains feature module configuration
 */

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig({
      featureModules: {
        rulebased: {
          cmsComponents: [
            'ConfiguratorForm',
            'ConfiguratorOverview',
            'ConfiguratorUpdateMessage',
            'ConfiguratorAddToCartButton',
            'ConfiguratorMenu',
            'ConfiguratorGroupTitle',
            'ConfiguratorOverviewBanner',
            'ConfiguratorPrevNext',
            'ConfiguratorPriceSummary',
            'ConfiguratorTitle',
            'ConfiguratorTabBar',
          ],
        },
      },
    }),
  ],
})
export class RulebasedConfiguratorRootFeatureModule {}
