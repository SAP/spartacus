import { NgModule } from '@angular/core';
import { StoreFinderStoreModule } from './store/store-finder-store.module';
import { StoreFinderService } from './facade/store-finder.service';
import { StoreDataService } from './facade';
import { GoogleMapRendererService, ExternalJsFileLoader } from './service';
import { StoreFinderOccModule } from './occ';

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
