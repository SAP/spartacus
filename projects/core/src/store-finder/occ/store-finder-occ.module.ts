import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';
import { OccStoreFinderService } from './store-finder.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [OccStoreFinderService]
})
export class StoreFinderOccModule {}
