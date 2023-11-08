/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuoteState, Quote } from '@spartacus/quote/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { QuoteListComponentService } from './quote-list-component.service';
import { CxDatePipe, TranslationService } from '@spartacus/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-quote-list',
  templateUrl: './quote-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CxDatePipe],
})
export class QuoteListComponent {
  protected quoteListComponentService = inject(QuoteListComponentService);
  protected translation = inject(TranslationService);
  protected cxDatePipe = inject(CxDatePipe);

  sorts = this.quoteListComponentService.sortOptions;
  sortLabels$ = this.quoteListComponentService.sortLabels$;
  quotesState$ = this.quoteListComponentService.quotesState$;
  dateFormat: string = 'MMMM d, YYYY h:mm aa';
  iconTypes = ICON_TYPE;

  constructor() {
    this.changePage(0);
    this.changeSorting(this.quoteListComponentService.defaultSortOption);
  }

  /**
   * Changes current sorting.
   *
   * @param sortCode - Identifies sort option that should be applied
   */
  changeSorting(sortCode: string): void {
    this.quoteListComponentService.setSorting(sortCode);
  }

  /**
   * Changes current page.
   *
   * @param page - Desired page number
   */
  changePage(page: number): void {
    this.quoteListComponentService.setPage(page);
  }

  /**
   * Retrieves the class name for the quote state. This class name is composed
   * using 'quote-' as prefix and the last part of the status name in lower case
   * (like e.g. draft for SELLER_DRAFT).
   *
   * @param state - quote state
   * @returns class name corresponding to quote state.
   */
  getQuoteStateClass(state: QuoteState): string {
    const stateAsString = state.toString();
    const indexSeparator = stateAsString.indexOf('_');
    //note: in case not found: indexSeparator is -1, lastPart will be stateAsString
    const lastPart = stateAsString.substring(indexSeparator + 1);
    return 'quote-' + lastPart.toLowerCase();
  }

  /**
   * Retrieves an accessibility text for a row in the quote list.
   *
   * @param quote - quote
   */
  getRowTitle(quote: Quote): string {
    let translatedText = '';
    translatedText += quote.name;
    translatedText += ' ';
    this.translation
      .translate('quote.header.overview.id')
      .pipe(take(1))
      .subscribe((text) => (translatedText += text));
    translatedText += ': ';
    translatedText += quote.code;
    translatedText += ' ';
    this.translation
      .translate('quote.header.overview.status')
      .pipe(take(1))
      .subscribe((text) => (translatedText += text));
    translatedText += ': ';
    this.translation
      .translate('quote.states.' + quote.state)
      .pipe(take(1))
      .subscribe((text) => (translatedText += text));
    translatedText += ' ';
    this.translation
      .translate('quote.list.updated')
      .pipe(take(1))
      .subscribe((text) => (translatedText += text));
    translatedText += ': ';
    translatedText += this.cxDatePipe.transform(
      quote?.updatedTime,
      this.dateFormat
    );
    translatedText += ' ';
    this.translation
      .translate('quote.list.clickableRow')
      .pipe(take(1))
      .subscribe((text) => (translatedText += text));
    return translatedText;
  }
}
