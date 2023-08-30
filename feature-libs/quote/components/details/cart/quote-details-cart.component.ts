/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartEvent, CartOutlets } from '@spartacus/cart/base/root';
import { EventService } from '@spartacus/core';
import {
  Quote,
  QuoteDetailsReloadQueryEvent,
  QuoteFacade,
} from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { QuoteDetailsCartComponentService } from './quote-details-cart.component.service';

@Component({
  selector: 'cx-quote-details-cart',
  templateUrl: './quote-details-cart.component.html',
})
export class QuoteDetailsCartComponent implements OnInit, OnDestroy {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  showCart$ = this.quoteDetailsCartService.getQuoteEntriesExpanded();
  iconTypes = ICON_TYPE;
  readonly cartOutlets = CartOutlets;
  protected subscription: Subscription;

  constructor(
    protected quoteFacade: QuoteFacade,
    protected quoteDetailsCartService: QuoteDetailsCartComponentService,
    protected eventService: EventService
  ) {}

  ngOnInit(): void {
    // if anything in the cart changes, reload the quote
    this.subscription = this.eventService.get(CartEvent).subscribe(() => {
      this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onToggleShowOrHideCart(showCart: boolean) {
    this.quoteDetailsCartService.setQuoteEntriesExpanded(!showCart);
  }
}
