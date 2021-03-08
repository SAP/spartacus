import { NgModule } from '@angular/core';
import { BundleStoreModule } from '../store/bundle-store.module';
import { BundleConnector } from './connectors/bundle.connector';

@NgModule({
  imports: [BundleStoreModule],
  providers: [BundleConnector],
})
export class BundleCoreModule {}
