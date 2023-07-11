/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-quote-details-cart',
  templateUrl: './quote-details-cart.component.html',
})
export class QuoteDetailsCartComponent {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();
  iconTypes = ICON_TYPE;
  showCart: boolean = true;
  readonly cartOutlets = CartOutlets;

  constructor(protected quoteFacade: QuoteFacade) {}
}
