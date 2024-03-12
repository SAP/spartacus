/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Product } from '@spartacus/core';
import { OpfQuickBuyDeliveryType } from '@spartacus/opf/base/root';
import { PickupLocationsSelectors } from '@spartacus/pickup-in-store/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfPickupInStoreHandlerService {
  protected currentProductService = inject(CurrentProductService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected store = inject(Store);

  getSingleProductDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
    console.log('Run getSingleProductDeliveryType');
    return this.currentProductService.getProduct().pipe(
      take(1),
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

  getActiveCartDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
    console.log('Run getActiveCartDeliveryType');
    return this.activeCartFacade.hasDeliveryItems().pipe(
      take(1),
      map((hasDeliveryItems: boolean) =>
        hasDeliveryItems
          ? OpfQuickBuyDeliveryType.SHIPPING
          : OpfQuickBuyDeliveryType.PICKUP
      )
    );
  }
}
