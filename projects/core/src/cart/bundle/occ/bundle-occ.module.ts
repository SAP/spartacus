import { NgModule } from '@angular/core';

import { provideDefaultConfig } from '@spartacus/core';
import { BundleAdapter } from 'projects/core/src/cart/bundle/core/public_api';
import { OccBundleAdapter } from './adapters';
import { defaultOccBundleConfig } from './adapters/default-occ-bundle-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccBundleConfig),
    { provide: BundleAdapter, useClass: OccBundleAdapter },
  ],
})
export class BundleOccModule {}
