/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { consignments } from './consignments';
import { entries } from './entries';

export interface order {
  deliveryItemsQuantity: number;
  consignments: consignments[];
  entries: entries[];
}
