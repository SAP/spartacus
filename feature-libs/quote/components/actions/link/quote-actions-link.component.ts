/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartUtilsService } from '@spartacus/quote/core';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-quote-actions-link',
  templateUrl: './quote-actions-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteActionsLinkComponent {
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
