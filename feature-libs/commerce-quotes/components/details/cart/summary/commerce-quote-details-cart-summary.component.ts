/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';

@Component({
  selector: 'cx-commerce-quote-details-cart-summary',
  templateUrl: 'commerce-quote-details-cart-summary.component.html',
})
export class CommerceQuotesDetailsCartSummaryComponent {
  quoteDetails$ = this.commerceQuotesService.getQuoteDetails();

  readonly cartOutlets = CartOutlets;

  constructor(protected commerceQuotesService: CommerceQuotesFacade) {}
}
