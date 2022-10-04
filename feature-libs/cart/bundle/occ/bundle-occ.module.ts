import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { BundleAdapter } from '@spartacus/cart/bundle/core';
import { defaultOccBundleConfig } from './adapters/default-occ-bundle-config';
import { OccBundleAdapter } from './adapters/occ-bundle.adapter';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccBundleConfig),
    { provide: BundleAdapter, useClass: OccBundleAdapter },
  ],
})
export class BundleOccModule {}
