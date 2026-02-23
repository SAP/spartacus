/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  SAPGiftCardBalanceRequest,
  SAPGiftCardResponse,
} from '@spartacus/opf/gift-card/root';

import { Observable } from 'rxjs';
import { OpfGiftCardAdapter } from './opf-gift-card.adapter';

@Injectable({
  providedIn: 'root',
})
export class OpfGiftCardConnector {
  protected adapter = inject(OpfGiftCardAdapter);

  public applyGiftCard(
    userId: string,
    cartId: string,
    giftCardBalanceRequest: SAPGiftCardBalanceRequest
  ): Observable<SAPGiftCardResponse> {
    return this.adapter.applyGiftCard(userId, cartId, giftCardBalanceRequest);
  }

  public removeGiftCard(
    userId: string,
    cartId: string,
    giftCardId: string
  ): Observable<void> {
    return this.adapter.removeGiftCard(userId, cartId, giftCardId);
  }
}
