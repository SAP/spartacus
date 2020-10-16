import { NgModule } from '@angular/core';
import { defaultStoreFinderConfig } from './config/default-store-finder-config';
import { StoreFinderStoreModule } from './store/store-finder-store.module';
import { provideDefaultConfig } from '../config/config-providers';

@NgModule({
  imports: [StoreFinderStoreModule],
  providers: [provideDefaultConfig(defaultStoreFinderConfig)],
})
export class StoreFinderCoreModule {}
