import { NgModule } from '@angular/core';
import { Config, provideDefaultConfig } from '../config/config.module';
import { defaultStoreFinderConfig } from './config/default-store-finder-config';
import { StoreFinderConfig } from './config/store-finder-config';
import { StoreDataService } from './facade/store-data.service';
import { StoreFinderService } from './facade/store-finder.service';
import {
  ExternalJsFileLoader,
  GoogleMapRendererService,
} from './service/index';
import { StoreFinderStoreModule } from './store/store-finder-store.module';

@NgModule({
  imports: [StoreFinderStoreModule],
  providers: [
    provideDefaultConfig(defaultStoreFinderConfig),
    StoreFinderService,
    StoreDataService,
    GoogleMapRendererService,
    ExternalJsFileLoader,
    { provide: StoreFinderConfig, useExisting: Config },
  ],
})
export class StoreFinderCoreModule {}
