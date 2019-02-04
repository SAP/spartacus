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

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccUserService,
    OccMiscsService,
    OccOrderService,
    { provide: OccConfig, useExisting: Config }
  ]
})
export class OccModule {}
