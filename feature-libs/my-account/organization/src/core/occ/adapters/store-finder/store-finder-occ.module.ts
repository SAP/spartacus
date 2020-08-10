import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '../../../../../../../../projects/core/src/config/config.module';
import { StoreFinderAdapter } from '../../../../../../../../projects/core/src/store-finder/connectors/store-finder.adapter';
import { defaultOccStoreFinderConfig } from './default-occ-store-finder-config';
import { OccStoreFinderAdapter } from './occ-store-finder.adapter';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccStoreFinderConfig),
    { provide: StoreFinderAdapter, useClass: OccStoreFinderAdapter },
  ],
})
export class StoreFinderOccModule {}
