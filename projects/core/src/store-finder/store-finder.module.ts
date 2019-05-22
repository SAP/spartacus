import { NgModule } from '@angular/core';
import { StoreFinderStoreModule } from './store/store-finder-store.module';
import { StoreFinderService } from './facade/store-finder.service';
import { StoreDataService } from './facade/store-data.service';
import {
  ExternalJsFileLoader,
  GoogleMapRendererService,
} from './service/index';
import { Config, ConfigModule } from '../config/config.module';
import { defaultStoreFinderConfig } from './config/default-store-finder-config';
import { StoreFinderConfig } from './config/store-finder-config';

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultStoreFinderConfig),
    StoreFinderStoreModule,
  ],
  providers: [
    StoreFinderService,
    StoreDataService,
    GoogleMapRendererService,
    ExternalJsFileLoader,
    { provide: StoreFinderConfig, useExisting: Config },
  ],
})
export class StoreFinderCoreModule {}
