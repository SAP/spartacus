/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserIdService } from '@spartacus/core';
import { QuoteConnector } from '../connectors';
import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { Quote } from '@spartacus/quote/root';
import { CheckoutPaymentTypeComponentService } from '@spartacus/checkout/b2b/components';
import { ActiveCartFacade } from '@spartacus/cart/base/root';

@Injectable()
export class QuoteCheckoutPaymentTypeComponentService extends CheckoutPaymentTypeComponentService {
  private activeCartFacade: ActiveCartFacade = inject(ActiveCartFacade);
  private userIdService: UserIdService = inject(UserIdService);
  private quoteConnector: QuoteConnector = inject(QuoteConnector);

  isPONumberReadOnly(): Observable<boolean> {
    return combineLatest([
      this.userIdService.getUserId(),
      this.activeCartFacade.getActive(),
    ]).pipe(
      switchMap(([userId, cart]) => {
        return this.quoteConnector
          .getQuote(userId, cart.quoteCode ?? '')
          .pipe(map((quote: Quote) => !!quote.sapPurchaseOrderNumber));
      })
    );
  }
}
