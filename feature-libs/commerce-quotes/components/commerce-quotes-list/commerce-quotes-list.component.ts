/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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

  constructor(protected quoteListService: CommerceQuotesListComponentService) {}

  changeSortCode(sortCode: string): void {
    this.quoteListService.setSort(sortCode);
  }

  changePage(page: number): void {
    this.quoteListService.setCurrentPage(page);
  }

  // ngOnDestroy(): void {
  //     console.log('ngOnDestroy, reset page and sort code ');
  //     this.changePage(0);
  //     this.changeSortCode('byCode');
  // }

  ngOnInit(): void {
    console.log('ngOnInit, reset page and sort code ');
    this.changePage(0);
    this.changeSortCode('byCode');
  }
}
