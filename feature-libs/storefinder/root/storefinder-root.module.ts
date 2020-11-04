import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultStorefinderLayoutConfig } from './config/default-storefinder-layout-config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultStorefinderLayoutConfig),
    provideDefaultConfig({
      featureModules: {
        storefinder: {
          cmsComponents: ['StoreFinderComponent'],
        },
      },
    }),
  ],
})
export class StorefinderRootModule {}
