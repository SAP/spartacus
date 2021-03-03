import { NgModule } from '@angular/core';
import { BundleCoreModule } from '@spartacus/bundle/core';
import { BundleOccModule } from '@spartacus/bundle/occ';

@NgModule({
  imports: [BundleCoreModule, BundleOccModule],
})
export class BundleModule {}
