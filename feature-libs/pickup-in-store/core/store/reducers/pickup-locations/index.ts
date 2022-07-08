import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { PickupLocationsState } from '../../pickup-location-state';
import { intendedPickupLocationsReducer } from './pickup-locations.reducer';

function getReducers(): ActionReducerMap<PickupLocationsState> {
  return {
    intendedPickupLocations: intendedPickupLocationsReducer,
  };
}

export const pickupLocationsReducersToken: InjectionToken<
  ActionReducerMap<PickupLocationsState>
> = new InjectionToken<ActionReducerMap<PickupLocationsState>>(
  'PickupLocationsReducers'
);

export const pickupLocationsReducersProvider: Provider = {
  provide: pickupLocationsReducersToken,
  useFactory: getReducers,
};

export const pickupLocationsMetaReducers: MetaReducer<any>[] = [];
