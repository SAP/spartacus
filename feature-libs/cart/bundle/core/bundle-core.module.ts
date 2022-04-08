import { ModuleWithProviders, NgModule } from '@angular/core';
import { BundleStoreModule } from './store/bundle-store.module';
// import { BundleConnector } from './connectors/bundle.connector';

@NgModule({
  imports: [BundleStoreModule], //, BundleConnector],
})
export class BundleCoreModule {
  static forRoot(): ModuleWithProviders<BundleCoreModule> {
    return {
      ngModule: BundleCoreModule,
    };
  }
}
