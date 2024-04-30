/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventService } from '@spartacus/core';
import {
  CartUtilsService,
  QuoteDetailsReloadQueryEvent,
} from '@spartacus/quote/core';
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
  protected eventService = inject(EventService);

  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();

  /**
   * Creates a new cart and navigates according to the 'cart' route.
   */
  goToNewCart(): void {
    //since from now on, the active cart deviates from the quote, we need to mark
    //the quote details for reload. Otherwise a browser back won't always work.
    this.eventService.dispatch({}, QuoteDetailsReloadQueryEvent);
    this.cartUtilsService.goToNewCart();
  }
}
