/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OPF_QUICK_BUY_FEATURE } from '../feature-name';
import { OpfQuickBuySingleProductCartOptions } from '../model/opf-quick-buy.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfQuickBuySingleProductCartOptionsFacade,
      feature: OPF_QUICK_BUY_FEATURE,
      methods: ['getSingleProductCartOptions'],
    }),
})
export abstract class OpfQuickBuySingleProductCartOptionsFacade {
  abstract getSingleProductCartOptions(
    productCode: string
  ): Observable<OpfQuickBuySingleProductCartOptions>;
}
