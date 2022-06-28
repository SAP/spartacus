import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultBundleLayoutConfig } from './config/default-bundle-layout-config';
import { BUNDLES_FEATURE } from './feature-name';

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultBundleLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        [BUNDLES_FEATURE]: {
          cmsComponents: ['BundleCarouselComponent', 'CartTotalsComponent'],
        },
      },
    }),
  ],
})
export class BundleRootModule {}
