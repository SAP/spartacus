/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyValuePair } from '../../asm-customer-360.model';

export interface CustomerTableColumn {
  text: string;
  i18nTextKey?: string;
  property: string;
  sortOrder?: 'asc' | 'desc';
  renderAsStarRating?: boolean;
  /** If truthy, use the value to read the value from the entry to link to. */
  urlProperty?: string;
  isDate?: boolean;
  navigatable?: boolean;
}

export interface TableEntry {
  [key: string]: string | Array<KeyValuePair> | number | undefined;
}
