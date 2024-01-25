/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import { combineLatest } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-pickup-info-container',
  templateUrl: './pickup-info-container.component.html',
})
export class PickupInfoContainerComponent implements OnInit {
  storesDetailsData: Partial<PointOfService>[];

  constructor(
    protected activeCartService: ActiveCartFacade,
    protected storeDetails: PickupLocationsSearchFacade
  ) {}

  ngOnInit(): void {
    this.activeCartService
      .getActive()
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
        tap(
          (storesDetailsData) => (this.storesDetailsData = storesDetailsData)
        ),
        take(1)
      )
      .subscribe();
  }
}
