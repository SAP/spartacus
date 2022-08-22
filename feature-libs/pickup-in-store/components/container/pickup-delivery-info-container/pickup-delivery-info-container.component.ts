/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import {
  AugmentedOrderEntry,
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';


@Component({
  selector: 'cx-pickup-delivery-info-container',
  templateUrl: './pickup-delivery-info-container.component.html',
})
export class PickupDeliveryInfoContainerComponent implements OnInit {
  cart$: Observable<Cart>;
  storesDetailsData: Partial<PointOfService>[] = [];
  storesDetailsMap: Map<string, PointOfService | undefined>;
  entries: AugmentedOrderEntry[] | undefined = [];
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
        tap((entries) => (this.entries = entries)),
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
          pointOfService.map(
            ({ address, displayName, openingHours, name }) => ({
              address,
              displayName,
              openingHours,
              name,
            })
          )
        ),
        tap(
          (storesDetailsData) => (this.storesDetailsData = storesDetailsData)
        ),

        tap(() => {
          this.storesDetailsMap = new Map(
            this.storesDetailsData
              .filter((store) => !!store.name)
              .map((store) => [store.name, store])
          );
        }),
        tap(
          () =>
            (this.entries = this.entries?.map((entry) => ({
              ...entry,
              deliveryPointOfServiceExtraDetails: this.storesDetailsMap.get(
                entry.deliveryPointOfService?.name
              ),
            })))
        )
      )
      .subscribe();
  }
}
