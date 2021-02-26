import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

const cmsComponents: string[] = [
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
];

/**
 * Contains feature module configuration
 */
@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig({
      featureModules: {
        /**
         * @deprecated since 3.1.0-RC.3 - use key `productConfiguratorRulebased` instead.
         *
         * TODO(#11232) remove `rulebased` key
         *
         * It depends on customer's app module, which KEY will be used. The KEY
         * with undefined `config.featureModules[KEY].module` will be ignored.
         */
        rulebased: { cmsComponents },
        productConfiguratorRulebased: { cmsComponents },
      },
    }),
  ],
})
export class RulebasedConfiguratorRootFeatureModule {}
