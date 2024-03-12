/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Product } from '@spartacus/core';
import { OpfQuickBuyDeliveryType } from '@spartacus/opf/base/root';
import { PickupLocationsSelectors } from '@spartacus/pickup-in-store/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfPickupInStoreHandlerService {
  protected currentProductService = inject(CurrentProductService);
  protected store = inject(Store);

  getSingleProductDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
    return this.currentProductService.getProduct().pipe(
      switchMap((product: Product | null) => {
        return this.store.pipe(
          select(
            PickupLocationsSelectors.getIntendedPickupLocationByProductCode(
              product?.code || ''
            )
          )
        );
      }),
      map((intendedLocation) => {
        return intendedLocation?.pickupOption === 'pickup'
          ? OpfQuickBuyDeliveryType.PICKUP
          : OpfQuickBuyDeliveryType.SHIPPING;
      })
    );
  }
}
