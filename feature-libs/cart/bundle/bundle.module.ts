import { NgModule } from '@angular/core';
import { BundleComponentsModule, BundleCoreModule } from './core/public_api';
import { BundleOccModule } from './occ/public_api';

@NgModule({
  imports: [
    BundleCoreModule.forRoot(),
    BundleOccModule,
    BundleComponentsModule,
  ],
})
export class BundleModule {}
