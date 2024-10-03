/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../../../model/product.model';
import { ScopedData } from '../../../model/scoped-data';

/**
 * Used in product connectors and adapter to load multiple product codes and scopes
 */
export interface ScopedProductData extends ScopedData<Product> {
  code: string;
}
