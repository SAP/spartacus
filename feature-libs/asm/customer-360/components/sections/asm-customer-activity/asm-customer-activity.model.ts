/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TableEntry } from '../../asm-customer-table/asm-customer-table.model';

export interface GeneralEntry extends TableEntry {
  typeId?: string; // require for navigation
  type?: string;
  id?: string;
  description?: string;
  category?: string;
  created?: number;
  updated?: number;
  url?: string;
}

export interface ValueLocalization {
  propertyName?: string;
  id?: string;
  i18nNameKey: string;
  options?: any;
  value?: string;
}
