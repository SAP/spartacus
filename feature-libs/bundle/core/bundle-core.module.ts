import { NgModule } from '@angular/core';
import { BundleConnector } from './connectors/bundle.connector';

@NgModule({
  imports: [BundleStoreModule],
  providers: [BundleConnector],
})
export class BundleCoreModule {}
