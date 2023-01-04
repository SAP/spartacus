/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';

export interface AsmInterestProductEntry {
  products: Observable<Product | undefined>[];
}

export enum OverviewSection {
  ACTIVE_CART = 'ACTIVE_CART',
  SAVED_CART = 'SAVED_CART',
  INTERESTS = 'INTERESTS',
}
