/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer360Activity } from '@spartacus/asm/customer-360/root';
import { TableEntry } from '../../asm-customer-table/asm-customer-table.model';

export interface ActivityEntry extends Customer360Activity, TableEntry {
  id?: string;
  typeLabel?: string;
  statusLabel?: string;
}

export interface ValueLocalization {
  propertyName?: string;
  id?: string;
  i18nNameKey: string;
  options?: any;
  value?: string;
}
