/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CustomerTableColumn {
  text?: string;
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

export interface GeneralEntry extends TableEntry {
  typeId?: string;
  type?: string;
  id?: string;
  description?: string;
  category?: string;
  created?: number;
  updated?: number;
  url?: string;
}
