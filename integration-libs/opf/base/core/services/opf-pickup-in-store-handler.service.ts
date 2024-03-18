/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Product } from '@spartacus/core';
import { OpfQuickBuyDeliveryType } from '@spartacus/opf/base/root';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpfPickupInStoreHandlerService {
  protected currentProductService = inject(CurrentProductService);
  protected activeCartFacade = inject(ActiveCartFacade);
  protected intendedPickupLocationFacade = inject(IntendedPickupLocationFacade);

  /**
   * Retrieves the delivery type for a single product based on the intended pickup location.
   * @return An observable emitting the delivery type (pickup or shipping).
   */
  getSingleProductDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
    if (!this.intendedPickupLocationFacade) {
      return of(OpfQuickBuyDeliveryType.SHIPPING);
    }

    return this.currentProductService.getProduct().pipe(
      take(1),
      switchMap((product: Product | null) =>
        this.intendedPickupLocationFacade
          .getIntendedLocation(product?.code as string)
          .pipe(
            map((intendedLocation) => {
              return intendedLocation?.pickupOption ===
                OpfQuickBuyDeliveryType.PICKUP.toLowerCase()
                ? OpfQuickBuyDeliveryType.PICKUP
                : OpfQuickBuyDeliveryType.SHIPPING;
            })
          )
      )
    );
  }

  getSingleProductPickupLocationName(): Observable<string|undefined> {
    if (!this.intendedPickupLocationFacade) {
      return of(undefined);
    }
    return this.currentProductService.getProduct().pipe(
      take(1),
      switchMap((product: Product | null) =>
        this.intendedPickupLocationFacade
          .getIntendedLocation(product?.code as string)
          .pipe(
            map((intendedLocation) => {
              return intendedLocation?.pickupOption ===
                OpfQuickBuyDeliveryType.PICKUP.toLowerCase() && intendedLocation?.name ? intendedLocation.name : undefined
                
            })
          )
      )
    );
  }

  /**
   * Retrieves the delivery type for the active cart based on the presence of delivery items.
   * @return An observable emitting the delivery type (shipping or pickup) for the active cart.
   */
  getActiveCartDeliveryType(): Observable<OpfQuickBuyDeliveryType> {
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
