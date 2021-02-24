import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

const cmsComponents: string[] = ['TextfieldConfigurationForm'];

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
        productConfiguratorTextfield: { cmsComponents },
      },
    }),
  ],
})
export class TextfieldConfiguratorRootFeatureModule {}
