import { NgModule } from '@angular/core';

import { provideDefaultConfig } from '@spartacus/core';
import { BundleAdapter } from '@spartacus/bundle/core';
import { OccBundleAdapter } from './adapters';
import { defaultOccBundleConfig } from './adapters/default-occ-bundle-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccBundleConfig),
    { provide: BundleAdapter, useClass: OccBundleAdapter },
  ],
})
export class BundleOccModule {}
