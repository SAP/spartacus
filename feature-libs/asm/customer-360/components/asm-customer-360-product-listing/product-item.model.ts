/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@spartacus/core';

export interface ProductItem extends Product {
  quantity?: number;
  // prices at cart order is created
  basePrice?: string;
  totalPrice?: string;
}
