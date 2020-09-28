import { NgModule } from '@angular/core';
import { StoreFinderAdapter } from '../../../store-finder/connectors/store-finder.adapter';
import { defaultOccStoreFinderConfig } from './default-occ-store-finder-config';
import { OccStoreFinderAdapter } from './occ-store-finder.adapter';
import { provideDefaultConfig } from '../../../config/config-providers';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccStoreFinderConfig),
    { provide: StoreFinderAdapter, useClass: OccStoreFinderAdapter },
  ],
})
export class StoreFinderOccModule {}
