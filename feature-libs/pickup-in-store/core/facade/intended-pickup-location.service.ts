import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { PickupLocationActions, PickupLocationsSelectors } from '../store';
import {
  AugmentedPointOfService,
  PickupOption,
  StateWithPickupLocations,
} from '../store/pickup-location-state';

/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
@Injectable()
export class IntendedPickupLocationService
  implements IntendedPickupLocationFacade
{
  constructor(protected readonly store: Store<StateWithPickupLocations>) {}

  getIntendedLocation(
    productCode: string
  ): Observable<AugmentedPointOfService | undefined> {
    return this.store.pipe(
      select(
        PickupLocationsSelectors.getIntendedPickupLocationByProductCodeFactory(
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
