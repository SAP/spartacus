import { Class, Fragment } from '../../asm-customer-360.model';

export abstract class ListingFragment implements Fragment {
  abstract type: string;
  abstract text: string;
  items: Array<ListingItem>;
  emptyText?: string;
  buttonAction?(item: ListingItem): void;

  constructor(
    rawItems: Array<RawListingItem>,
    itemClass: Class<ListingItem, RawListingItem>
  ) {
    this.items = rawItems.map((item) => new itemClass(item));
  }
}

export interface Searchable extends ListingFragment {
  searchTerm: string;
  searchAction(term: string): void;
}

export interface Tabulated extends ListingFragment {
  currentTab: number;
  tabs: Array<{
    tabName: string;
    items: Array<ListingItem>;
    emptyText: string;
  }>;
  setCurrentTab(tab: number): void;
}

export type ListingFragmentType = ListingFragment & Searchable & Tabulated;

export class ListingItem {
  [key: string]: string | boolean | undefined;
}

export interface RawListingItem {
  [key: string]: string | boolean | number | undefined;
}
