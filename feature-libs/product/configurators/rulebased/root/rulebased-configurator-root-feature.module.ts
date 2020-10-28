import { NgModule } from '@angular/core';
import { FeatureModuleConfig, provideDefaultConfig } from '@spartacus/core';

/**
 * Contains feature module configuration
 */
@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig(<FeatureModuleConfig>{
      featureModules: {
        rulebased: {
          module: () =>
            import('@spartacus/product/configurators/rulebased').then(
              (m) => m.RuleBasedConfiguratorModule
            ),
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
