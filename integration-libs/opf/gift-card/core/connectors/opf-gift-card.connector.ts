/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  GiftCardBalanceRequest,
  GiftCardResponse,
} from '@spartacus/opf/gift-card/root';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { OpfGiftCardAdapter } from './opf-gift-card.adapter';

@Injectable({
  providedIn: 'root',
})
export class OpfGiftCardConnector {
  protected adapter = inject(OpfGiftCardAdapter);

  /**
   * Apply gift card and get balance
   */
  public applyGiftCard(
    userId: string,
    cartId: string,
    giftCardBalanceRequest: GiftCardBalanceRequest
  ): Observable<GiftCardResponse> {
    return this.adapter.applyGiftCard(userId, cartId, giftCardBalanceRequest);
  }

  /**
   * Delete/unapply a previously applied gift card
   */
  public removeGiftCard(
    userId: string,
    cartId: string,
    giftCardId: string
  ): Observable<void> {
    return this.adapter.removeGiftCard(userId, cartId, giftCardId);
  }
}
