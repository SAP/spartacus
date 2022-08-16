/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, Optional } from '@angular/core';
import { OrderEntry } from '@spartacus/cart/base/root';
import {
  PickupLocationsSearchFacade,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import { OutletContextData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cart-pickup-options-container',
  templateUrl: 'cart-pickup-options-container.component.html',
})
export class CartPickupOptionsContainerComponent implements OnInit {
  pickupOption$: Observable<PickupOption>;
  displayName$: Observable<string>;
  constructor(
    @Optional() protected outlet: OutletContextData<OrderEntry>,
    protected storeDetails: PickupLocationsSearchFacade
  ) {}

  ngOnInit() {
    this.pickupOption$ = this.outlet?.context$.pipe(
      map(
        (item): PickupOption =>
          item?.deliveryPointOfService ? 'pickup' : 'delivery'
      )
    );

    this.displayName$ = this.outlet?.context$.pipe(
      map((entry) => entry?.deliveryPointOfService?.name),
      tap((storeName) => console.log('Debug: storeName: ', storeName)),
      filter((name): name is string => !!name),
      tap((storeName) => this.storeDetails.loadStoreDetails(storeName)),
      switchMap((storeName) => this.storeDetails.getStoreDetails(storeName)),
      map((store) => store?.displayName ?? '')
    );
  }
}
