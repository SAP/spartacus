import { Fragment, Class } from '../../asm-customer-360.model';
import { keyValuePair } from '../../asm-customer-360.model';

export abstract class TableFragment implements Fragment {
  entries: Array<TableEntry>;
  columns: Array<{
    text: string;
    property: string;
    sortOrder?: 'asc' | 'desc';
  }>;
  currentSort: {
    property: string;
    sortOrder: 'asc' | 'desc';
  };
  entryPages: Array<Array<TableEntry>>;
  currentPage: number;
  pageSize: number;

  abstract emptyText: string;
  abstract type: string;
  abstract text: string;

  public setPageNumber(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  public sortEntriesAndUpdatePages(sortByProperty: string): void {
    this.entries = this.sortEntries(this.entries, sortByProperty);
    this.entryPages = this.updateEntryPages(this.entries);
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
    sortByProperty: string
  ): Array<TableEntry> {
    if (sortByProperty === this.currentSort?.property) {
      if (this.currentSort.sortOrder === 'asc') {
        this.currentSort.sortOrder = 'desc';
      } else if (this.currentSort.sortOrder === 'desc') {
        this.currentSort.sortOrder = 'asc';
      }
    } else if (this.currentSort?.property !== sortByProperty) {
      this.currentSort.property = sortByProperty;
      this.currentSort.sortOrder = 'asc';
    }
    const newEntries = entries.slice();
    return newEntries.sort((entryA, entryB) => {
      const prev = entryA[sortByProperty]?.value;
      const next = entryB[sortByProperty]?.value;
      let dir = 1;
      if (entryA[sortByProperty]?.details?.reverseSort) {
        dir = -1;
      }
      if (this.currentSort.sortOrder === 'asc') {
        if (prev !== undefined && next !== undefined) {
          return prev < next ? dir * -1 : dir * 1;
        } else {
          return prev !== undefined ? -1 : 1;
        }
      } else {
        if (prev !== undefined && next !== undefined) {
          return prev < next ? dir * 1 : dir * -1;
        } else {
          return prev !== undefined ? -1 : 1;
        }
      }
    });
  }

  constructor(
    rawEntries: Array<RawTableEntry>,
    sortProperty: string,
    entryClass: Class<TableEntry, RawTableEntry>,
    pageSize: number = 5,
    currentPage: number = 0
  ) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.currentSort = { property: sortProperty, sortOrder: 'desc' };
    this.entries = this.sortEntries(
      rawEntries.map((rawEntry) => new entryClass(rawEntry)),
      this.currentSort.property
    );
    this.entryPages = this.updateEntryPages(this.entries);
    this.columns = Object.getOwnPropertyNames(new entryClass({})).map((key) => {
      let column: {
        property: string;
        text: string;
        sortOrder?: 'asc' | 'desc';
      } = { property: key, text: key.toUpperCase() };
      if (key === this.currentSort.property) {
        column.sortOrder = this.currentSort.sortOrder;
      }
      return column;
    });
  }
}

export interface RawTableEntry {
  [key: string]: string | Array<keyValuePair> | number | undefined;
}

export class TableEntry {
  [key: string]: TableEntryCell;
}

export interface TableEntryCell {
  value?: string | number;
  text?: string;
  details?: {
    url?: string;
    starRating?: boolean;
    reverseSort?: boolean;
  };
}
