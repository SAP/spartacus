/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TrackingService } from './tracking.service';

@NgModule({
  providers: [
    {
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: TrackingService.factory,
      deps: [TrackingService],
    },
  ],
})
export class TrackingModule {}
