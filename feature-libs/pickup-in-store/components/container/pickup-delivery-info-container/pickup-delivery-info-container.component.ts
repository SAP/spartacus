/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'tr[cx-pickup-delivery-info-container]',
  templateUrl: './pickup-delivery-info-container.component.html',
})
export class PickupDeliveryInfoContainerComponent implements OnInit {
  cart$: Observable<Cart>;
  storesDetailsData: Partial<PointOfService>[];
  constructor(
    protected readonly activeCartService: ActiveCartFacade,
    protected readonly intendedPickupLocationService: IntendedPickupLocationFacade,
    protected readonly storeDetails: PickupLocationsSearchFacade
  ) {}
  ngOnInit(): void {
    this.cart$ = this.activeCartService.getActive();
    this.cart$
      .pipe(
        map((cart) => cart.entries),
        filter((entries): entries is OrderEntry[] => !!entries),
        map((entries) =>
          entries
            .map((entry) => entry.deliveryPointOfService?.name)
            .filter((name): name is string => !!name)
        ),
        tap((storeNames) =>
          storeNames.forEach((storeName) =>
            this.storeDetails.loadStoreDetails(storeName)
          )
        ),
        mergeMap((storeNames) =>
          combineLatest(
            storeNames.map((storeName) =>
              this.storeDetails
                .getStoreDetails(storeName)
                .pipe(filter((details) => !!details))
            )
          )
        ),
        map((pointOfService) =>
          pointOfService.map(({ address, displayName, openingHours }) => ({
            address,
            displayName,
            openingHours,
          }))
        ),
        tap((storesDetailsData) => (this.storesDetailsData = storesDetailsData))
      )
      .subscribe();
  }
}
