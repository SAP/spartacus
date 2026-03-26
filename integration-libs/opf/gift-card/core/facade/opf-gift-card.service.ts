/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Injectable, inject } from '@angular/core';
import { Observable, combineLatest, filter, switchMap, take } from 'rxjs';
import {
  OpfActiveConfiguration,
  OpfBaseFacade,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';
import {
  OpfGiftCardFacade,
  SAPGiftCardBalanceRequest,
  SAPGiftCardResponse,
} from '@spartacus/opf/gift-card/root';
import { map, startWith } from 'rxjs/operators';

import { OpfGiftCardConnector } from '../connectors';
import { UserIdService } from '@spartacus/core';

@Injectable()
export class OpfGiftCardService implements OpfGiftCardFacade {
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected opfGiftCardConnector = inject(OpfGiftCardConnector);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected userIdService = inject(UserIdService);

  /**
   * Get gift card payment configuration from active configurations.
   * Filters by providerType: "GIFT_CARD_PAYMENT".
   *
   * @returns Observable of gift card configuration or undefined if not found
   */
  getGiftCardConfiguration(): Observable<OpfActiveConfiguration | undefined> {
    return this.opfBaseFacade
      .getActiveConfigurationsState()
      .pipe(
        map((config) =>
          (config?.data?.value || []).find(
            (item) =>
              item?.providerType === OpfPaymentProviderType.STORED_VALUE_PAYMENT
          )
        )
      );
  }

  isGiftCardEnabled(): Observable<boolean> {
    return this.getGiftCardConfiguration().pipe(
      map((config) => !!config),
      startWith(false)
    );
  }

  isGiftCardCoveredTotalAmount(cart$: Observable<Cart>): Observable<boolean> {
    return cart$.pipe(
      map((cart) => cart?.sapGiftCardSummary?.giftCardsCoverFullAmount ?? false)
    );
  }

  /**
   * Apply a gift card to the active cart.
   *
   * @param request Gift card balance request with card number and security code
   * @returns Observable of the applied gift card response
   */
  applyGiftCard(
    request: SAPGiftCardBalanceRequest
  ): Observable<SAPGiftCardResponse> {
    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartFacade.getActiveCartId(),
    ]).pipe(
      filter(([userId, cartId]) => Boolean(userId && cartId)),
      take(1),
      switchMap(([userId, cartId]) =>
        this.opfGiftCardConnector.applyGiftCard(userId, cartId, request)
      )
    );
  }

  /**
   * Remove a previously applied gift card from the active cart.
   *
   * @param giftCardId The ID of the gift card to remove
   */
  removeGiftCard(giftCardId: string): Observable<void> {
    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartFacade.getActiveCartId(),
    ]).pipe(
      filter(([userId, cartId]) => Boolean(userId && cartId)),
      take(1),
      switchMap(([userId, cartId]) =>
        this.opfGiftCardConnector.removeGiftCard(userId, cartId, giftCardId)
      )
    );
  }
}
