import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultStoreFinderLayoutConfig } from './config/default-store-finder-layout-config';
import { STORE_FINDER_FEATURE } from './feature-name';

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultStoreFinderLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        [STORE_FINDER_FEATURE]: {
          cmsComponents: ['StoreFinderComponent'],
        },
      },
    }),
  ],
})
export class StoreFinderRootModule {}
