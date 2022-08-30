export interface CustomerListingTab {
  buttonConfig?: CustomerListingButton;
  tabName: string;
  items: Array<ListingItem>;
  emptyText: string;
}

export interface CustomerListingButton {
  applyText: string;
  appliedText?: string;
  removeText?: string;
  isApplied?: (item: ListingItem) => boolean;
}

export interface ListingItem {
  title: string | undefined;
  description: string | undefined;
  applied: boolean;
}
