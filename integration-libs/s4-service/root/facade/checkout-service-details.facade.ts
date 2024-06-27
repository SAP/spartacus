/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { S4_SERVICE_FEATURE } from '../feature-name';
import { ServiceDetails } from '../model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutServiceDetailsFacade,
      feature: S4_SERVICE_FEATURE,
      methods: ['setServiceScheduleSlot'],
    }),
})
export abstract class CheckoutServiceDetailsFacade {
  //add jsDoc for the param
  abstract setServiceScheduleSlot(
    scheduledAt: ServiceDetails
  ): Observable<unknown>;
  // recheck the return types
}
