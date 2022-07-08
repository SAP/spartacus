import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { BUNDLE_FEATURE } from './feature-name';
import { defaultBundleLayoutConfig } from './config/default-bundle-layout-config';

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultBundleLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        [BUNDLE_FEATURE]: {
          cmsComponents: ['BundleCarouselComponent'],
        },
      },
    }),
  ],
})
export class BundleRootModule {}
