import { NgModule } from '@angular/core';
import { StoreFinderStoreModule } from './store/store-finder-store.module';
import { StoreFinderService } from './facade/store-finder.service';
import { StoreDataService } from './facade/store-data.service';
import {
  GoogleMapRendererService,
  ExternalJsFileLoader
} from './service/index';
import { StoreFinderOccModule } from './occ/store-finder-occ.module';

@NgModule({
  imports: [StoreFinderStoreModule, StoreFinderOccModule],
  providers: [
    StoreFinderService,
    StoreDataService,
    GoogleMapRendererService,
    ExternalJsFileLoader
  ]
})
export class StoreFinderCoreModule {}
