/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartUtilsService } from '@spartacus/quote/core';
import { Quote, QuoteFacade } from '@spartacus/quote/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-quote-actions-link',
  templateUrl: './quote-actions-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteActionsLinkComponent {
  quoteDetails$: Observable<Quote> = this.quoteFacade.getQuoteDetails();

  constructor(
    protected quoteFacade: QuoteFacade,
    protected cartUtilsService: CartUtilsService
  ) {}

  goToNewCart(): void {
    this.cartUtilsService.goToNewCart();
  }
}
