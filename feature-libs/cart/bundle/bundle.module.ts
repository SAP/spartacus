import { NgModule } from '@angular/core';
import { BundleCoreModule } from './core/public_api';
import { BundleOccModule } from './occ/public_api';

@NgModule({
  imports: [BundleCoreModule, BundleOccModule],
})
export class BundleModule {}
