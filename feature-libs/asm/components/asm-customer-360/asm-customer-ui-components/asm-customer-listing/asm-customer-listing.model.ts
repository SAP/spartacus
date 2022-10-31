/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
