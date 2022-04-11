import { NgModule } from '@angular/core';
import { BundleCoreModule } from './core/public_api';
import { BundleOccModule } from './occ/public_api';

@NgModule({
  imports: [BundleCoreModule.forRoot(), BundleOccModule],
})
export class BundleModule {}
