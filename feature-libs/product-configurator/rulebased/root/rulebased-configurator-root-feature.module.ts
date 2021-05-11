import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { PRODUCT_CONFIGURATOR_RULEBASED_FEATURE } from './feature-name';

const cmsComponents: string[] = [
  'ConfiguratorForm',
  'ConfiguratorOverviewForm',
  'ConfiguratorUpdateMessage',
  'ConfiguratorAddToCartButton',
  'ConfiguratorMenu',
  'ConfiguratorGroupTitle',
  'ConfiguratorOverviewBanner',
  'ConfiguratorPrevNext',
  'ConfiguratorPriceSummary',
  'ConfiguratorProductTitle',
  'ConfiguratorTabBar',
  'CpqConfiguratorConflictAndErrorMessagesComponent',
];

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductConfiguratorRulebasedComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE]: {
        cmsComponents,
      },
    },
  };

  return config;
}

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
      },
    }),
    provideDefaultConfigFactory(
      defaultProductConfiguratorRulebasedComponentsConfig
    ),
  ],
})
export class RulebasedConfiguratorRootFeatureModule {}
