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
import { Observable, combineLatest, filter, switchMap, take } from 'rxjs';
import {
  OpfActiveConfiguration,
  OpfBaseFacade,
  OpfPaymentProviderType,
} from '@spartacus/opf/base/root';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { OpfGiftCardConnector } from '@spartacus/opf/gift-card/core';
import { UserIdService } from '@spartacus/core';
import { map } from 'rxjs/operators';

@Injectable()
export class GiftCardService {
  protected opfBaseFacade = inject(OpfBaseFacade);
  protected opfGiftCardConnector = inject(OpfGiftCardConnector);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected userIdService = inject(UserIdService);

  /**
   * Get gift card payment configuration from active configurations
   * Filters by providerType: "GIFT_CARD_PAYMENT"
   * @returns Observable of gift card configuration or undefined if not found
   */
  getGiftCardConfiguration(): Observable<OpfActiveConfiguration | undefined> {
    return this.opfBaseFacade.getActiveConfigurationsState().pipe(
      filter((state) => !state.loading),
      map((config) =>
        (config?.data?.value || []).find(
          (item) =>
            item?.providerType === OpfPaymentProviderType.GIFT_CARD_PAYMENT
        )
      )
    );
  }

  /**
   * Apply gift card and get balance
   * @param request Gift card balance request with configurationId and card details
   * @returns Observable of gift card balance response
   */

  applyGiftCard(request: GiftCardBalanceRequest): Observable<GiftCardResponse> {
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
   * Delete/unapply a previously applied gift card
   */

  // removeGiftCard(request: GiftCardDeleteRequest): Observable<void> {
  //   return this.opfGiftCardConnector.deleteGiftCard(request);
  // }this.opfGiftCardConnector.removeGiftCard(giftCardId);

  // removeGiftCard(giftCardId: string): Observable<void> {
  //  console.log('GiftCardService: ');
  //   return combineLatest([
  //     this.userIdService.getUserId(),
  //     this.activeCartFacade.getActiveCartId(),
  //   ]).pipe(
  //     filter(([userId, cartId]) => Boolean(userId && cartId)),
  //     take(1),
  //     switchMap(([userId, cartId]) =>
  //       this.opfGiftCardConnector.removeGiftCard(userId, cartId, giftCardId)
  //     )
  //   );
  // }

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
