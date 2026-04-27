/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

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

  protected isGiftCardCoveredTotalAmountEvent: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isGiftCardCoveredTotalAmountEvent$: Observable<boolean> =
    this.isGiftCardCoveredTotalAmountEvent.asObservable();

  /**
   * Emits an event to indicate if the gift card covers the total amount
   * @param isCovered Boolean indicating if the gift card covers the total amount
   */
  emitIsGiftCardCoveredTotalAmountEvent(isCovered: boolean): void {
    this.isGiftCardCoveredTotalAmountEvent.next(isCovered);
  }
}
