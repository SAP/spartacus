import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultStoreFinderLayoutConfig } from './config/default-store-finder-layout-config';
import { STORE_FINDER_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultStoreFinderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [STORE_FINDER_FEATURE]: {
        cmsComponents: ['StoreFinderComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  declarations: [],
  providers: [
    provideDefaultConfig(defaultStoreFinderLayoutConfig),
    provideDefaultConfigFactory(defaultStoreFinderComponentsConfig),
  ],
})
export class StoreFinderRootModule {}
