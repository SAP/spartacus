/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartUtilsService } from '@spartacus/quote/core';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-quote-links',
  templateUrl: './quote-links.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteLinksComponent {
  protected quoteFacade = inject(QuoteFacade);
  protected cartUtilsService = inject(CartUtilsService);

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();

  /**
   * Creates a new cart and navigates according to the 'cart' route.
   */
  goToNewCart(): void {
    this.cartUtilsService.goToNewCart();
  }
}
