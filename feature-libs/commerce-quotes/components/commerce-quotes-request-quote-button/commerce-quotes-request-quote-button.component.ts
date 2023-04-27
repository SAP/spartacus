/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-commerce-quotes-request-quote-button',
  templateUrl: './commerce-quotes-request-quote-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesRequestQuoteButtonComponent implements OnDestroy {
  @ViewChild('element') element: ElementRef;

  protected subscription = new Subscription();

  constructor(
    protected commerceQuotesFacade: CommerceQuotesFacade,
    protected routingService: RoutingService
  ) {}

  goToQuoteDetails(): void {
    this.subscription.add(
      this.commerceQuotesFacade
        .createQuote(
          {},
          {
            text: 'sometext',
          }
        )
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
