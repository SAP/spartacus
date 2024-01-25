/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AddOrderEntriesContext } from './add-order-entries.context';
import { GetOrderEntriesContext } from './get-order-entries.context';

export const ORDER_ENTRIES_CONTEXT = Symbol('ORDER_ENTRIES_CONTEXT');

export type OrderEntriesContext = Partial<
  AddOrderEntriesContext & GetOrderEntriesContext
>;
