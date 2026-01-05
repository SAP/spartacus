/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpfPaymentEventsService {
  protected reinitiatePaymentEvent: Subject<number | undefined> = new Subject();
  reinitiatePaymentEvent$: Observable<number | undefined> =
    this.reinitiatePaymentEvent.asObservable();

  /**
   * Emits an event to re-initiate payment form
   * @param paymentOptionId Optional payment option ID to use for re-initiation
   */
  emitReinitiatePaymentEvent(paymentOptionId?: number): void {
    this.reinitiatePaymentEvent.next(paymentOptionId);
  }
}
