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
        textfield: {
          cmsComponents: ['TextfieldConfigurationForm'],
        },
      },
    }),
  ],
})
export class TextfieldConfiguratorRootFeatureModule {}
