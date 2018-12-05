import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Config, OccConfig } from '@spartacus/core';
import { OccUserService } from './user/user.service';
import { OccMiscsService } from './miscs/miscs.service';
import { OccOrderService } from './order/order.service';
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
