/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { QuoteFacade } from '@spartacus/quote/root';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-request-button',
  templateUrl: './quote-request-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteRequestButtonComponent implements OnDestroy {
  protected quoteFacade = inject(QuoteFacade);
  protected routingService = inject(RoutingService);

  protected subscription = new Subscription();

  /**
   * Creates a new quote and triggers the navigation according to route 'quoteDetails',
   * in order to land on the quote details page.
   */
  goToQuoteDetails(): void {
    this.subscription.add(
      this.quoteFacade
        .createQuote({})
        .pipe(
          tap((quote) => {
            this.routingService.go({
              cxRoute: 'quoteDetails',
              params: { quoteId: quote.code },
            });
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
