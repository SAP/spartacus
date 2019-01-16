import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { OccModule } from '../../occ/occ.module';
import { OccStoreFinderService } from './store-finder.service';
import { OccE2eConfigurationService } from './e2e/e2e-configuration-service';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [OccStoreFinderService, OccE2eConfigurationService]
})
export class StoreFinderOccModule {}
