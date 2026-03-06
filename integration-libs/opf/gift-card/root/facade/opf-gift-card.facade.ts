/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SAPGiftCardBalanceRequest, SAPGiftCardResponse } from '../model';

import { Cart } from '@spartacus/cart/base/root';
import { Injectable } from '@angular/core';
import { OPF_GIFT_CARD_FEATURE } from '../feature-name';
import { Observable } from 'rxjs';
import { OpfActiveConfiguration } from '@spartacus/opf/base/root';
import { facadeFactory } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfGiftCardFacade,
      feature: OPF_GIFT_CARD_FEATURE,
      methods: [
        'getGiftCardConfiguration',
        'isGiftCardEnabled',
        'isGiftCardCoveredTotalAmount',
        'applyGiftCard',
        'removeGiftCard',
      ],
    }),
})
export abstract class OpfGiftCardFacade {
  /**
   * Get gift card payment configuration from active configurations.
   * Filters by providerType: "GIFT_CARD_PAYMENT".
   *
   * @returns Observable of gift card configuration or undefined if not found
   */
  abstract getGiftCardConfiguration(): Observable<
    OpfActiveConfiguration | undefined
  >;

  /**
   * Check whether gift card payment is enabled in the active configuration.
   *
   * @returns Observable<boolean> emitting `true` when a GIFT_CARD_PAYMENT config exists
   */
  abstract isGiftCardEnabled(): Observable<boolean>;

  /**
   * Check whether applied gift cards fully cover the cart total.
   *
   * @param cart$ Observable of the active cart
   * @returns Observable<boolean>
   */
  abstract isGiftCardCoveredTotalAmount(
    cart$: Observable<Cart>
  ): Observable<boolean>;

  /**
   * Apply a gift card to the active cart.
   *
   * @param request Gift card balance request with card number and security code
   * @returns Observable of the applied gift card response
   */
  abstract applyGiftCard(
    request: SAPGiftCardBalanceRequest
  ): Observable<SAPGiftCardResponse>;

  /**
   * Remove a previously applied gift card from the active cart.
   *
   * @param giftCardId The ID of the gift card to remove
   */
  abstract removeGiftCard(giftCardId: string): Observable<void>;
}
