/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { orders } from './orders';
import { pagination } from './pagination';
import { sorts } from './sorts';

export interface finalOrder {
  orders: orders[];
  pagination?: pagination;
  sorts?: sorts[];
}
