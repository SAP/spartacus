/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AugmentedPointOfService,
  IntendedPickupLocationFacade,
  PickupOption,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

import { PickupLocationActions, PickupLocationsSelectors } from '../store';
import { StateWithPickupLocations } from '../store/pickup-location-state';

/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
@Injectable()
export class IntendedPickupLocationService
  implements IntendedPickupLocationFacade
{
  constructor(protected store: Store<StateWithPickupLocations>) {
    // Intentional empty constructor
  }

  getIntendedLocation(
    productCode: string
  ): Observable<AugmentedPointOfService | undefined> {
    return this.store.pipe(
      select(
        PickupLocationsSelectors.getIntendedPickupLocationByProductCode(
          productCode
        )
      )
    );
  }

  getPickupOption(productCode: string): Observable<PickupOption> {
    return this.store.pipe(
      select(PickupLocationsSelectors.getPickupOptionByProductCode(productCode))
    );
  }

  setPickupOption(productCode: string, pickupOption: PickupOption): void {
    this.store.dispatch(
      PickupLocationActions.SetPickupOption({
        payload: { productCode, pickupOption },
      })
    );
  }

  setIntendedLocation(
    productCode: string,
    location: AugmentedPointOfService
  ): void {
    this.store.dispatch(
      PickupLocationActions.AddLocation({ payload: { productCode, location } })
    );
  }

  removeIntendedLocation(productCode: string): void {
    this.store.dispatch(
      PickupLocationActions.RemoveLocation({ payload: productCode })
    );
  }
}
