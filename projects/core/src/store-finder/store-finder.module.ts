import { NgModule } from '@angular/core';
import { StoreFinderStoreModule } from './store/store-finder-store.module';
import { StoreFinderService } from './facade/store-finder.service';
import { StoreDataService } from './facade/store-data.service';
import {
  GoogleMapRendererService,
  ExternalJsFileLoader
} from './service/index';
import { StoreFinderOccModule } from './occ/store-finder-occ.module';
import { ConfigModule } from '../config';
import { defaultStoreFinderConfig } from './config/default-store-finder-config';
import { StoreFinderConfig } from './config/store-finder-config';

@NgModule({
  imports: [
    ConfigModule.withConfig(defaultStoreFinderConfig),
    StoreFinderStoreModule,
    StoreFinderOccModule
  ],
  providers: [
    StoreFinderService,
    StoreDataService,
    GoogleMapRendererService,
    ExternalJsFileLoader,
    { provide: StoreFinderConfig, useValue: defaultStoreFinderConfig }
  ]
})
export class StoreFinderCoreModule {}
