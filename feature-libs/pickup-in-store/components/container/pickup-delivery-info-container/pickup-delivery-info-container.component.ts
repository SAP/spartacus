/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { OutletContextData } from '@spartacus/storefront';

import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'tr[cx-pickup-delivery-info-container]',
  templateUrl: './pickup-delivery-info-container.component.html',
})
export class PickupDeliveryInfoContainerComponent implements OnInit {
  storeDetailsData: Partial<PointOfService>;
  orderEntry: OrderEntry;
  constructor(
    protected outlet: OutletContextData<OrderEntry>,
    protected readonly activeCartService: ActiveCartFacade,
    protected readonly intendedPickupLocationService: IntendedPickupLocationFacade,
    protected readonly storeDetails: PickupLocationsSearchFacade
  ) {}
  ngOnInit(): void {
    // TODO make sure we clean up the subscription in ngDestroy
    this.outlet?.context$
      .pipe(
        tap((orderEntry) => (this.orderEntry = orderEntry)),
        map((entry) => entry.deliveryPointOfService?.name),
        filter((storeName) => !!storeName),
        tap((storeName) =>
          this.storeDetails.loadStoreDetails(storeName as string)
        ),
        mergeMap((storeName) =>
          this.storeDetails
            .getStoreDetails(storeName as string)
            .pipe(filter((details) => !!details))
        ),
        map(({ address, displayName, openingHours, name }) => ({
          address,
          displayName,
          openingHours,
          name,
        })),
        tap((storeDetailsData) => (this.storeDetailsData = storeDetailsData))
      )
      .subscribe();
  }
}
