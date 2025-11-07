/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// cpq-quote-status.service.ts

import { Injectable, inject } from '@angular/core';
import { CartItemListComponentService } from '@spartacus/cart/base/components';
import { CpqQuoteService } from './cpq-qute.service';

@Injectable({
  providedIn: 'root',
})
export class CpqQuoteSharedService extends CartItemListComponentService {
  private flagService = inject(CpqQuoteService);


  showBasePriceWithDiscount(): boolean {
    return this.flagService.getFlag$();
  }
}
