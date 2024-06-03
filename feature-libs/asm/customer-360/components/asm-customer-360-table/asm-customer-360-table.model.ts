/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export enum CustomerTableTextAlign {
  START = 'START',
  CENTER = 'CENTER',
  END = 'END',
}

export interface CustomerTableColumn {
  text?: string;
  i18nTextKey?: string;
  property: string;
  renderAsStarRating?: boolean;
  isDate?: boolean;
  navigatable?: boolean;
  textAlign?: CustomerTableTextAlign;
  headerTextAlign?: CustomerTableTextAlign;
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
