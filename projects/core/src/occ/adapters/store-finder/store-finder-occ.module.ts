import { NgModule } from '@angular/core';
import { ConfigModule } from '../../../config/config.module';
import { StoreFinderAdapter } from '../../../store-finder/connectors/store-finder.adapter';
import { defaultOccStoreFinderConfig } from './default-occ-store-finder-config';
import { OccStoreFinderAdapter } from './occ-store-finder.adapter';

@NgModule({
  imports: [ConfigModule.withConfig(defaultOccStoreFinderConfig)],
  providers: [
    {
      provide: StoreFinderAdapter,
      useExisting: OccStoreFinderAdapter,
    },
  ],
})
export class StoreFinderOccModule {}
