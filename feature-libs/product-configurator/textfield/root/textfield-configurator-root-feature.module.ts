import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE } from './feature-name';

const cmsComponents: string[] = ['TextfieldConfigurationForm'];

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductConfiguratorTextfieldComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE]: {
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
         * @deprecated since 3.1.0-RC.3 - use key `productConfiguratorTextfield` instead.
         *
         * TODO(#11232) remove `textfield` key
         *
         * It depends on customer's app module, which KEY will be used. The KEY
         * with undefined `config.featureModules[KEY].module` will be ignored.
         */
        textfield: { cmsComponents },
      },
    }),
    provideDefaultConfigFactory(
      defaultProductConfiguratorTextfieldComponentsConfig
    ),
  ],
})
export class TextfieldConfiguratorRootFeatureModule {}
