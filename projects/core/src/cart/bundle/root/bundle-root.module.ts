import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultBundleLayoutConfig } from './config/default-bundle-layout-config';

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultBundleLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        bundle: {
          // cmsComponents: ['StoreFinderComponent'],
        },
      },
    }),
  ],
})
export class BundleRootModule {}
