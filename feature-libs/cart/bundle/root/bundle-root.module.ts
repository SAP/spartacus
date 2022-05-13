import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultBundleLayoutConfig } from './config/default-bundle-layout-config';
import { BUNDLE_CAROUSEL_FEATURE } from './feature-name';

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultBundleLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        [BUNDLE_CAROUSEL_FEATURE]: {
          cmsComponents: ['BundleCarouselComponent'],
        },
      },
    }),
  ],
})
export class BundleRootModule {}
