/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { QuoteFacade } from '@spartacus/commerce-quotes/root';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-commerce-quotes-details-cart',
  templateUrl: './commerce-quotes-details-cart.component.html',
})
export class CommerceQuotesDetailsCartComponent {
  quoteDetails$ = this.commerceQuotesService.getQuoteDetails();
  iconTypes = ICON_TYPE;
  showCart = true;
  readonly cartOutlets = CartOutlets;

  constructor(protected commerceQuotesService: QuoteFacade) {}
}
