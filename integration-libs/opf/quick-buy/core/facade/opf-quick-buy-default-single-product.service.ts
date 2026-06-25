/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  OpfQuickBuySingleProductCartOptions,
  OpfQuickBuySingleProductCartOptionsFacade,
} from '@spartacus/opf/quick-buy/root';
import { Observable, of } from 'rxjs';

@Injectable()
export class OpfQuickBuyDefaultSingleProductService
  implements OpfQuickBuySingleProductCartOptionsFacade
{
  getSingleProductCartOptions(
    _productCode: string
  ): Observable<OpfQuickBuySingleProductCartOptions> {
    return of({ quantity: 1 });
  }
}
