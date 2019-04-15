import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  Config,
  OccConfig,
  OccUserService,
  OccMiscsService,
  OccOrderService,
  NotificationPreferenceService,
} from '@spartacus/core';
@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    OccUserService,
    OccMiscsService,
    OccOrderService,
    NotificationPreferenceService,
    { provide: OccConfig, useExisting: Config },
  ],
})
export class OccModule {}
