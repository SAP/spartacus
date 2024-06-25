/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class CheckoutServiceDetailsFacade {
  //add jsDoc for the param
  abstract updateServiceScheduleSlot(
    scheduledAt: string
  ): Observable<any> | undefined;
  // recheck the return types
}
