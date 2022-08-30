import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { KeyValuePair } from '../../asm-customer-360.model';
import { CustomerTableColumn, TableEntry } from './asm-customer-table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-table',
  templateUrl: './asm-customer-table.component.html',
})
export class AsmCustomerTableComponent implements OnInit {
  @Input()
  columns: Array<CustomerTableColumn>;

  @Input()
  currentPage = 0;

  @Input()
  emptyStateText: string;

  @Input()
  entries: Array<TableEntry>;

  @Input()
  headerText: string;

  @Input()
  pageSize: number;

  @Input()
  sortProperty: string;

  reverseSort = false;

  entryPages: Array<Array<TableEntry>>;

  ngOnInit(): void {
    const entries = this.sortEntries(this.entries, this.sortProperty);
    this.entryPages = this.updateEntryPages(entries);
  }

  public sortEntriesAndUpdatePages(property: string): void {
    const currentProperty = this.sortProperty;

    let reverseSort: boolean;

    if (property !== currentProperty) {
      reverseSort = false;
    } else {
      reverseSort = !this.reverseSort;
    }

    this.sortProperty = property;
    this.reverseSort = reverseSort;

    this.entries = this.sortEntries(this.entries, property, reverseSort);
    this.entryPages = this.updateEntryPages(this.entries);
  }

  public setPageNumber(pageNumber: number): void {
    this.currentPage = pageNumber;
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
    sortByProperty: string,
    reverseSort?: boolean
  ): Array<TableEntry> {
    const newEntries = entries.slice().sort((entryA, entryB) => {
      const prev = entryA[sortByProperty];
      const next = entryB[sortByProperty];
      return this.compareEntryValues(prev, next);
    });

    if (reverseSort) {
      return newEntries.reverse();
    } else {
      return newEntries;
    }
  }

  private compareEntryValues(
    a: string | number | Array<KeyValuePair> | undefined,
    b: string | number | Array<KeyValuePair> | undefined
  ): number {
    if (a === undefined || b === undefined) {
      if (a === undefined && b === undefined) {
        return 0;
      } else if (a === undefined) {
        return -1;
      } else {
        return 1;
      }
    } else if (typeof a !== typeof b) {
      // Assume the values need to be of the same type to be compared.
      throw new TypeError('Compared values need to be of the same type.');
    } else if (Array.isArray(a) || Array.isArray(b)) {
      // Ignore KeyValuePairs, assuming they will not be sorted.
      return 0;
    } else if (typeof a === 'string') {
      return a.localeCompare(b as string);
    } else {
      // Assuming both values are 'number' now.
      return a - (b as number);
    }
  }
}
