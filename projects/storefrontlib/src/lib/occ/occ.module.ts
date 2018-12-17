import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  Config,
  OccConfig,
  OccUserService,
  OccMiscsService,
  OccOrderService
} from '@spartacus/core';
import { OccStoreFinderService } from './store/store-finder.service';
import { OccE2eConfigurationService } from './e2e/e2e-configuration-service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccUserService,
    OccMiscsService,
    OccOrderService,
    OccStoreFinderService,
    OccE2eConfigurationService,
    { provide: OccConfig, useExisting: Config }
  ]
})
export class OccModule {}
