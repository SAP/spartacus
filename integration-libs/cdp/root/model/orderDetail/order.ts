/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { consignments } from './consignments';
import { entries } from './entries';
import { OrderExtendedAttributes } from './order-extended-attributes';
export interface order {
  deliveryItemsQuantity: number;
  consignments: consignments[];
  entries: entries[];
  deliveryStatus: string;
  cdpOrderExtendedAttributes: OrderExtendedAttributes;
}
