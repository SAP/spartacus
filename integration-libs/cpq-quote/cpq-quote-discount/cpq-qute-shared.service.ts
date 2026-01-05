/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// cpq-quote-status.service.ts

import { Injectable } from '@angular/core';
import { CartItemListComponentService } from '@spartacus/cart/base/components';
import { CpqQuoteService } from './cpq-qute.service';

@Injectable({
  providedIn: 'root',
})
export class CpqQuoteSharedService extends CartItemListComponentService {
  constructor(private flagService: CpqQuoteService) {
    super();
  }

  showBasePriceWithDiscount(): boolean {
    return this.flagService.getFlag$();
  }
}
