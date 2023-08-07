/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { CartAdapter, CartEntryAdapter } from '@spartacus/cart/base/root';
import { OccCartEntryAdapter } from './occ-cart-entry.adapter';
import { OccCartAdapter } from './occ-cart.adapter';

export const adapterProviders: Provider[] = [
  OccCartAdapter,
  {
    provide: CartAdapter,
    useExisting: OccCartAdapter,
  },
  OccCartEntryAdapter,
  {
    provide: CartEntryAdapter,
    useExisting: OccCartEntryAdapter,
  },
];
