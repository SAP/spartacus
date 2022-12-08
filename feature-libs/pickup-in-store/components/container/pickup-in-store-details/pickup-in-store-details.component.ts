/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';

import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-pick-up-in-store-details',
  templateUrl: 'pickup-in-store-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PickUpInStoreDetailsComponent implements OnInit {
  deliveryPointsOfService$ = this.activeCartFacade.getActive().pipe(
    filter((cart) => !!cart.entries),
    filter((cart) => !!(cart.entries as Array<any>).length),
    map((cart) => {
      const COPY = [...(cart.entries as Array<any>)];
      COPY.sort((a, b) =>
        a.deliveryPointOfService?.name?.localeCompare(
          b.deliveryPointOfService?.name
        )
      );
      return COPY;
    }),
    map((sortedArray) =>
      sortedArray
        .filter((entry) => !!entry.deliveryPointOfService)
        .reduce((accumulator, value) => {
          const DELIVERY_POINT_OF_SERVICE = value.deliveryPointOfService.name;
          const existingValue = accumulator[DELIVERY_POINT_OF_SERVICE]
            ? accumulator[DELIVERY_POINT_OF_SERVICE]
            : [];
          return {
            ...accumulator,
            [DELIVERY_POINT_OF_SERVICE]: [...existingValue, value],
          };
        }, {})
    ),
    map((deliveryPointOfServiceMap) =>
      Object.keys(deliveryPointOfServiceMap).map((key) => ({
        name: key,
        value: deliveryPointOfServiceMap[key],
      }))
    ),
    tap(
      (
        deliveryPointOfServiceMap: Array<{ name: string; value: Array<Object> }>
      ) => {
        const NAMES = deliveryPointOfServiceMap.map(
          (deliveryPointOfService) => deliveryPointOfService.name
        );
        NAMES.forEach((name) =>
          this.pickupLocationsSearchService.loadStoreDetails(name)
        );
      }
    )
    // mergeMap()
  );
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade
  ) {}

  ngOnInit(): void {
    this.deliveryPointsOfService$.subscribe((d) => console.log('d', d));
  }
}
