/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@spartacus/cart/base/root';
import { HttpErrorModel } from '@spartacus/core';

export type QuickOrderAddEntryEvent = {
  productCode: string;
  entry?: OrderEntry;
  quantityAdded?: number;
  quantity: number;
  error?: HttpErrorModel;
};
