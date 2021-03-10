import { NgModule } from '@angular/core';
import { provideDefaultConfig } from 'projects/core/src/config/config-providers';
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
