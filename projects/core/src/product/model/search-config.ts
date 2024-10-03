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
   * filters in a format of `filter:value` or `filter:value1,value2`
   * separated also by `:`
   * @example `allCategories:584:code:1,2,3:availableInStores:Chiba`
   */
  filters?: string;
}
