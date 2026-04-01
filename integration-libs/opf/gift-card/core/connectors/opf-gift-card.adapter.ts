/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  OpfGiftCardBalanceRequest,
  OpfGiftCardResponse,
} from '@spartacus/opf/gift-card/root';

import { Observable } from 'rxjs';

export abstract class OpfGiftCardAdapter {
  /**
   * Apply gift card and get balance
   */
  abstract applyGiftCard(
    userId: string,
    cartId: string,
    opfGiftCardBalanceRequest: OpfGiftCardBalanceRequest
  ): Observable<OpfGiftCardResponse>;

  /**
   * Remove a previously applied gift card
   */
  abstract removeGiftCard(
    userId: string,
    cartId: string,
    giftCardId: string
  ): Observable<void>;
}
