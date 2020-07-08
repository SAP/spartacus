import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '../config/config.module';
import { defaultStoreFinderConfig } from './config/default-store-finder-config';
import { StoreFinderStoreModule } from './store/store-finder-store.module';

@NgModule({
  imports: [StoreFinderStoreModule],
  providers: [provideDefaultConfig(defaultStoreFinderConfig)],
})
export class StoreFinderCoreModule {}
