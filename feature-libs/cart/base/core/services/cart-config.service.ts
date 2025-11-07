/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { CartConfig } from '@spartacus/cart/base/root';

@Injectable({
  providedIn: 'root',
})
export class CartConfigService {
  protected config = inject(CartConfig);


  isSelectiveCartEnabled(): boolean {
    return Boolean(this.config?.cart?.selectiveCart?.enabled);
  }

  isCartValidationEnabled(): boolean {
    return Boolean(this.config?.cart?.validation?.enabled);
  }
}
