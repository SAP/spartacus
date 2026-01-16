/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractOrderContextDirective } from '@spartacus/cart/base/components';
import { AbstractOrderType, CartOutlets } from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  OutletDirective,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  QuoteItemsComponentService,
  QuoteItemsData,
} from './quote-items.component.service';

/**
 * Renders quote items. These items are either taken from the actual quote,
 * or from the attached quote cart.
 * Specifically if the quote is editable, changes to the entries will be
 * done by changing the attached quote cart's entries.
 *
 * Note that the component makes use of outlet CART_ITEM_LIST in order to
 * render the quote entries. The default implementation of this outlet is
 * in feature lib 'cartBase'. This lib is always loaded, because
 * quoteFacade.getQuoteDetails() always triggers activeCartFacade for checking
 * on the quote/cart link.
 */

@Component({
  selector: 'cx-quote-items',
  templateUrl: './quote-items.component.html',
  imports: [
    NgIf,
    IconComponent,
    AbstractOrderContextDirective,
    OutletDirective,
    NgFor,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class QuoteItemsComponent {
  protected quoteItemsComponentService = inject(QuoteItemsComponentService);

  quoteItemsData$: Observable<QuoteItemsData> =
    this.quoteItemsComponentService.retrieveQuoteEntries();

  showCart$ = this.quoteItemsComponentService.getQuoteEntriesExpanded();
  iconTypes = ICON_TYPE;
  readonly cartOutlets = CartOutlets;
  readonly abstractOrderType = AbstractOrderType;

  /**
   * Handler to toggle expanded state of quote entries section.
   *
   * @param showCart - current expanded state, will be inverted
   */
  onToggleShowOrHideCart(showCart: boolean) {
    this.quoteItemsComponentService.setQuoteEntriesExpanded(!showCart);
  }
}
