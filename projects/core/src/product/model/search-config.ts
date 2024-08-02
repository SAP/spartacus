/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: Move from product to more generic place
export interface SearchConfig {
  pageSize?: number;
  currentPage?: number;
  sort?: string;

  /**
   * filters in a format of `filter:value` separated also by `:`
   * @example `allCategories:584:availableInStores:Chiba`
   */
  filters?: string; // SPIKE NEW
}
