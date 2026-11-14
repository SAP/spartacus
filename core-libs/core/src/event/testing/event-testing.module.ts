/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { EventService } from '../event.service';
import { MockEventService } from './mock-event.service';

/** Provides a default {@link MockEventService} for {@link EventService}. */
@NgModule({
  providers: [{ provide: EventService, useClass: MockEventService }],
})
export class EventTestingModule {}
