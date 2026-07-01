/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { OpfQuickBuyDefaultSingleProductService } from '@spartacus/opf/quick-buy/core';
import {
  OpfQuickBuySingleProductCartOptions,
  OpfQuickBuySingleProductCartOptionsFacade,
} from '@spartacus/opf/quick-buy/root';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class OpfQuickBuyPickupInStoreSingleProductService
  implements OpfQuickBuySingleProductCartOptionsFacade
{
  protected defaultSingleProductService = inject(
    OpfQuickBuyDefaultSingleProductService
  );
  protected intendedPickupLocation = inject(IntendedPickupLocationFacade);

  getSingleProductCartOptions(
    productCode: string
  ): Observable<OpfQuickBuySingleProductCartOptions> {
    return this.defaultSingleProductService
      .getSingleProductCartOptions(productCode)
      .pipe(
        switchMap((baseOptions) =>
          combineLatest([
            this.intendedPickupLocation.getPickupOption(productCode),
            this.intendedPickupLocation.getIntendedLocation(productCode),
          ]).pipe(
            map(([pickupOption, intendedLocation]) => ({
              ...baseOptions,
              ...(pickupOption === 'pickup' && intendedLocation?.name
                ? { pickupStore: intendedLocation.name }
                : {}),
            }))
          )
        )
      );
  }
}
