import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultStoreFinderLayoutConfig } from './config/default-store-finder-layout-config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
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
