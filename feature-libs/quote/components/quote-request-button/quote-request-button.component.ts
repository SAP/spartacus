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
import { QuoteFacade } from '@spartacus/quote/root';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-request-button',
  templateUrl: './quote-request-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteRequestButtonComponent implements OnDestroy {
  @ViewChild('element') element: ElementRef;

  protected subscription = new Subscription();

  constructor(
    protected quoteFacade: QuoteFacade,
    protected routingService: RoutingService
  ) {}

  goToQuoteDetails(): void {
    this.subscription.add(
      this.quoteFacade
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
