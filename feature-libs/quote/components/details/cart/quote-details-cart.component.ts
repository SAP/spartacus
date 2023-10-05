/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { CartOutlets, ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { QuoteDetailsCartComponentService } from './quote-details-cart.component.service';

@Component({
  selector: 'cx-quote-details-cart',
  templateUrl: './quote-details-cart.component.html',
})
export class QuoteDetailsCartComponent {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  cartDetails$: Observable<Cart> = this.activeCartFacade.getActive();
  showCart$ = this.quoteDetailsCartService.getQuoteEntriesExpanded();
  iconTypes = ICON_TYPE;
  readonly cartOutlets = CartOutlets;
  protected subscription: Subscription;

  constructor(
    protected quoteFacade: QuoteFacade,
    protected activeCartFacade: ActiveCartFacade,
    protected quoteDetailsCartService: QuoteDetailsCartComponentService
  ) {}

  onToggleShowOrHideCart(showCart: boolean) {
    this.quoteDetailsCartService.setQuoteEntriesExpanded(!showCart);
  }
}
