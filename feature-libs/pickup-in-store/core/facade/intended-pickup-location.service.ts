import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PointOfService } from '@spartacus/core';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
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
  constructor(protected readonly store: Store<StateWithPickupLocations>) {}

  getIntendedLocation(
    productCode: string
  ): Observable<PointOfService | undefined> {
    return this.store.pipe(
      select(
        PickupLocationsSelectors.getIntendedPickupLocationByProductCodeFactory(
          productCode
        )
      )
    );
  }

  setIntendedLocation(productCode: string, location: PointOfService): void {
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
