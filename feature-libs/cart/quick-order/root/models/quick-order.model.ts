/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderEntry } from '@commerce-storefront-toolset/cart/base/root';
import { HttpErrorModel } from '@commerce-storefront-toolset/core';

export type QuickOrderAddEntryEvent = {
  productCode: string;
  entry?: OrderEntry;
  quantityAdded?: number;
  quantity: number;
  error?: HttpErrorModel;
};
