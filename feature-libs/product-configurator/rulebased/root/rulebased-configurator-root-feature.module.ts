import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

const cmsComponents: string[] = [
  'ConfiguratorForm',
  'ConfiguratorOverviewForm',
  'ConfiguratorUpdateMessage',
  'ConfiguratorAddToCartButton',
  'ConfiguratorGroupTitle',
  'ConfiguratorOverviewBanner',
  'ConfiguratorUpdateMessage',
  'ConfiguratorPrevNext',
  'ConfiguratorPriceSummary',
  'ConfiguratorTitle',
  'ConfiguratorTabBar',
];

//const cmsComponents2: string[] = ['ConfiguratorUpdateMessage'];

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
        //productConfiguratorRulebasedCpq: { cmsComponents2 },
      },
    }),
  ],
})
export class RulebasedConfiguratorRootFeatureModule {}
