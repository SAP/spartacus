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
import { AuthService, RoutingService } from '@spartacus/core';
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
  protected authService = inject(AuthService);

  protected subscription = new Subscription();

  /**
   * Quote handling requires a logged-in user. We cannot enforce that via an authGuard here
   * because otheriwise the entire cart page would need an authenticated user. So we check on
   * the view and don't render the button if the user is not logged in.
   */
  isLoggedIn$ = this.authService.isUserLoggedIn();

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
