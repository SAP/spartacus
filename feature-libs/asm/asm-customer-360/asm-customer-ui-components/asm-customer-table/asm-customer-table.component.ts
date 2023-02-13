/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  byBoolean,
  byComparison,
  byNullish,
  byString,
  isBoolean,
  isNumber,
  isString,
  itemsWith,
  property,
  SortOrder,
  whenType,
} from '@spartacus/asm/core';
import { BehaviorSubject } from 'rxjs';

import { CustomerTableColumn, TableEntry } from './asm-customer-table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-table',
  templateUrl: './asm-customer-table.component.html',
})
export class AsmCustomerTableComponent implements OnChanges {
  @Input() columns: Array<CustomerTableColumn>;

  @Input() emptyStateText: string;

  @Input() entries: Array<TableEntry>;

  @Input() headerText: string;

  @Input() pageSize: number;

  @Input() sortProperty: keyof TableEntry;

  @Output() selectItem = new EventEmitter<TableEntry>();

  SortOrder = SortOrder;

  currentPageNumber = 0;

  currentPage$ = new BehaviorSubject<Array<TableEntry> | undefined>(undefined);

  listSortOrder = SortOrder.ASC;

  entryPages: Array<Array<TableEntry>>;

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.entries) {
      const entries = this.sortEntries(
        this.entries,
        this.sortProperty,
        this.listSortOrder
      );
      this.entryPages = this.updateEntryPages(entries);
      this.setPageNumber(this.currentPageNumber);
    }
  }

  sortEntriesAndUpdatePages(sortProperty: string): void {
    const currentProperty = this.sortProperty;

    let newSortOrder: SortOrder;
    if (sortProperty !== currentProperty) {
      newSortOrder = SortOrder.ASC;
    } else {
      newSortOrder =
        this.listSortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    }

    this.sortProperty = sortProperty;
    this.listSortOrder = newSortOrder;

    this.entries = this.sortEntries(
      this.entries,
      this.sortProperty,
      this.listSortOrder
    );
    this.entryPages = this.updateEntryPages(this.entries);
    this.setPageNumber(this.currentPageNumber);
  }

  setPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
    this.currentPage$.next(this.entryPages[this.currentPageNumber]);
  }

  private updateEntryPages(
    entries: Array<TableEntry>
  ): Array<Array<TableEntry>> {
    const newEntryPages = [];
    for (let i = 0; i < entries.length; i += this.pageSize) {
      newEntryPages.push(entries.slice(i, i + this.pageSize));
    }
    return newEntryPages;
  }

  private sortEntries(
    entries: Array<TableEntry>,
    sortByProperty: keyof TableEntry,
    sortOrder: SortOrder
  ): Array<TableEntry> {
    if (entries?.length) {
      return entries.sort(
        itemsWith(
          property(
            sortByProperty,
            itemsWith(
              byNullish(SortOrder.DESC),
              whenType(isString, byString(sortOrder)),
              whenType(isNumber, byComparison(sortOrder)),
              whenType(isBoolean, byBoolean(sortOrder))
            )
          )
        )
      );
    } else {
      return [];
    }
  }
}
