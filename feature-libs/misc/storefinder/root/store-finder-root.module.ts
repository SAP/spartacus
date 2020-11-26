import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultStoreFinderLayoutConfig } from './config/default-store-finder-layout-config';

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultStoreFinderLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        storeFinder: {
          cmsComponents: ['StoreFinderComponent'],
        },
      },
    }),
  ],
})
export class StoreFinderRootModule {}
