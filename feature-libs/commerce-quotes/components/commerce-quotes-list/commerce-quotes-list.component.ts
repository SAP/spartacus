/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommerceQuotesListComponentService } from './commerce-quotes-list-component.service';

@Component({
  selector: 'cx-commerce-quotes-list',
  templateUrl: './commerce-quotes-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommerceQuotesListComponent {
  sorts = this.quoteListService.sorts;
  sortLabels$ = this.quoteListService.sortLabels$;
  quotesState$ = this.quoteListService.quotesState$;
  dateFormat: string = 'MMMM d, YYYY h:mm aa';

  constructor(protected quoteListService: CommerceQuotesListComponentService) {
    this.changePage(0);
    this.changeSortCode('byCode');
  }

  changeSortCode(sortCode: string): void {
    this.quoteListService.setSort(sortCode);
  }

  changePage(page: number): void {
    this.quoteListService.setCurrentPage(page);
  }

  getQuoteStateClass(state: string): string {
    switch (state) {
      case 'Draft':
        return 'quote-draft';
      case 'Submitted':
        return 'quote-submitted';
      case 'Rejected':
        return 'quote-rejected';
      case 'Vendor Quote':
        return 'quote-vendorQuote';
      case 'Cancelled':
        return 'quote-cancelled';
      default:
        return '';
    }
  }
}
