/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CustomerTableColumn {
  text: string;
  i18nTextKey?: string;
  property: string;
  sortOrder?: 'asc' | 'desc';
  renderAsStarRating?: boolean;
  isDate?: boolean;
  navigatable?: boolean;
}

export interface TableEntry {
  [key: string]: string | number | undefined;
}
