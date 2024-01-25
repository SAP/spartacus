/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import {
  DeliveryPointOfService,
  getProperty,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { combineLatest, iif, Observable, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';

/**
 * A service to get the Delivery Points Of Service for items to be picked up in store for the active cart
 */
@Injectable({
  providedIn: 'root',
})
export class DeliveryPointsService {
  constructor(
    protected activeCartFacade: ActiveCartFacade,
    protected pickupLocationsSearchFacade: PickupLocationsSearchFacade,
    protected orderFacade: OrderFacade
  ) {}

  /*
   * deliveryPointsOfService$ comprises arrays within an array.
   * It has an array of stores, and then for each store, an array of products to be collected from that store.
   * We need to get data from two different services. One of the services has the product data, ie the products to be picked up from in store.
   * This data only has the store name, no other information about the store eg address etc.
   * We then use another service to get data about the store. This service has two methods that must be called.
   * loadStoreDetails is called to make the api call. The data returned from this call populates an area of the ngrx store.
   * Then getStoreDetails is used to get store detail data from the relevant slice of state in the ngrx store.
   * So the below:
   * - gets active cart
   * - gets items in the cart
   * - gets those items that are to be picked up from a store
   * - get the data about each store
   *
   * Some of the below involves turning array data into lookup object data simply because this is easier to deal with
   */
  getDeliveryPointsOfServiceFromCart(): Observable<
    Array<DeliveryPointOfService>
  > {
    return this.activeCartFacade.getPickupEntries().pipe(
      filter((entries) => !!entries && !!entries.length),
      switchMap((entries) => this.getDeliveryPointsOfService(entries))
    );
  }

  getDeliveryPointsOfServiceFromOrder(): Observable<
    Array<DeliveryPointOfService>
  > {
    return this.orderFacade.getPickupEntries().pipe(
      filter((entries) => !!entries && !!entries.length),
      switchMap((entries) => this.getDeliveryPointsOfService(entries))
    );
  }

  getDeliveryPointsOfService(
    entries: Array<OrderEntry>
  ): Observable<Array<DeliveryPointOfService>> {
    return of(entries).pipe(
      map(
        (items): Array<OrderEntry> =>
          items.filter((entry) => !!entry.deliveryPointOfService)
      ),
      switchMap((elements) =>
        iif(
          () => !!elements.length,
          of(elements).pipe(
            map((_elements): Array<OrderEntry> => {
              const COPY = [..._elements];
              COPY.sort(
                (a: OrderEntry, b: OrderEntry) =>
                  a.deliveryPointOfService?.name?.localeCompare(
                    getProperty(b.deliveryPointOfService, 'name') || ''
                  ) || 0
              );
              return COPY;
            }),
            map((sortedArray) =>
              sortedArray.reduce(
                (accumulator: Record<string, Array<OrderEntry>>, value) => {
                  const DELIVERY_POINT_OF_SERVICE: string = value
                    .deliveryPointOfService?.name as string;
                  const existingValue: Array<OrderEntry> = accumulator[
                    DELIVERY_POINT_OF_SERVICE
                  ]
                    ? accumulator[DELIVERY_POINT_OF_SERVICE]
                    : [];
                  return {
                    ...accumulator,
                    [DELIVERY_POINT_OF_SERVICE]: [...existingValue, value],
                  };
                },
                {}
              )
            ),
            map(
              (
                deliveryPointOfServiceMap
              ): Array<{ name: string; value: Array<OrderEntry> }> =>
                Object.keys(deliveryPointOfServiceMap).map((key) => ({
                  name: key,
                  value: deliveryPointOfServiceMap[key],
                }))
            ),
            tap((deliveryPointOfServiceMap) =>
              deliveryPointOfServiceMap
                .map((deliveryPointOfService) => deliveryPointOfService.name)
                .forEach((name) =>
                  this.pickupLocationsSearchFacade.loadStoreDetails(name)
                )
            ),
            mergeMap((deliveryPointOfServiceMap) =>
              combineLatest(
                deliveryPointOfServiceMap
                  .map((deliveryPointOfService) => deliveryPointOfService.name)
                  .map((name) =>
                    this.pickupLocationsSearchFacade.getStoreDetails(name)
                  )
              ).pipe(
                map((storeDetails) => {
                  const STORE_DETAILS_MAP = storeDetails
                    .filter((_storeDetails) => !!_storeDetails)
                    .reduce(
                      (accumulator, value): Record<string, PointOfService> => ({
                        ...accumulator,
                        [value.name as string]: value,
                      }),
                      {} as Record<string, PointOfService>
                    );
                  return deliveryPointOfServiceMap.map(
                    (
                      store
                    ): {
                      name: string;
                      value: Array<OrderEntry>;
                      storeDetails: PointOfService;
                    } => ({
                      ...store,
                      storeDetails: STORE_DETAILS_MAP[store.name as string],
                    })
                  );
                })
              )
            )
          ),
          of([])
        )
      )
    );
  }
}
