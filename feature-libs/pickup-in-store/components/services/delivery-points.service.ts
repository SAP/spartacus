/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveCartFacade,
  OrderEntry,
  OrderEntryGroup,
} from '@spartacus/cart/base/root';
import { PointOfService } from '@spartacus/core';
import { OrderFacade } from '@spartacus/order/root';
import {
  DeliveryPointOfService,
  getProperty,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import {
  CollapsibleNode,
  HierarchyComponentService,
  HierarchyNode,
} from '@spartacus/storefront';
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
    protected orderFacade: OrderFacade,
    protected hierarchyService: HierarchyComponentService
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

  getDeliveryPointsOfServiceFromCartWithEntryGroups(): Observable<
    Array<DeliveryPointOfService>
  > {
    return combineLatest([
      this.activeCartFacade.getPickupEntries(),
      this.activeCartFacade.getPickupEntryGroups(),
    ]).pipe(
      filter(
        ([entries, entryGroups]) => !!entries?.length && !!entryGroups?.length
      ),
      switchMap(([entries, entryGroups]) =>
        this.getDeliveryPointsOfService(entries).pipe(
          map((deliveryPoints) =>
            deliveryPoints.map((deliveryPoint) => {
              // Define a function to find matching entry groups while preserving the original structure
              const findMatchingEntryGroups = (
                group: OrderEntryGroup
              ): OrderEntryGroup | null => {
                // Check if current group matches
                const matches = group.entries?.some((entry) =>
                  deliveryPoint.value.some(
                    (dEntry) => dEntry.entryNumber === entry.entryNumber
                  )
                );

                if (matches) {
                  // Create a copy of the group with its entryGroups
                  return {
                    ...group,
                    entryGroups: group.entryGroups
                      ?.map(findMatchingEntryGroups)
                      .filter(Boolean) as OrderEntryGroup[],
                  };
                }

                // Recursively check children if not a match
                if (group.entryGroups?.length) {
                  const filteredGroups = group.entryGroups
                    .map(findMatchingEntryGroups)
                    .filter(Boolean) as OrderEntryGroup[];
                  if (filteredGroups.length > 0) {
                    return { ...group, entryGroups: filteredGroups };
                  }
                }

                return null;
              };

              // Apply the recursive function to filter and map entryGroups
              const relatedEntryGroups = entryGroups
                .map(findMatchingEntryGroups)
                .filter(Boolean) as OrderEntryGroup[];

              // Convert entryGroups to HierarchyNode
              const bundles: HierarchyNode[] = [];
              relatedEntryGroups.forEach((entryGroup) => {
                if (entryGroup.type === 'CONFIGURABLEBUNDLE') {
                  const root = new CollapsibleNode('ROOT', {
                    children: [],
                  });
                  this.hierarchyService.buildHierarchyTree([entryGroup], root);
                  bundles.push(root);
                }
              });

              // Return the delivery point with matched entry groups
              return {
                ...deliveryPoint,
                entryGroups: relatedEntryGroups,
                hierachyTrees: bundles, // Add the bundles property here
              };
            })
          )
        )
      )
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
