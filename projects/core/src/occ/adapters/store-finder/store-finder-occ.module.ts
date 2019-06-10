import { NgModule } from '@angular/core';
import { StoreFinderAdapter } from '../../../store-finder/connectors/store-finder.adapter';
import { OccStoreFinderAdapter } from './occ-store-finder.adapter';

@NgModule({
  providers: [{ provide: StoreFinderAdapter, useClass: OccStoreFinderAdapter }],
})
export class StoreFinderOccModule {}
