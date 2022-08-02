import { createReducer, on } from '@ngrx/store';
import { PickupLocationActions } from '../../actions';
import { PickupLocationsState } from '../../pickup-location-state';

export const intendedPickupLocationsInitialState: PickupLocationsState['intendedPickupLocations'] =
  {};
export const intendedPickupLocationsReducer = createReducer(
  intendedPickupLocationsInitialState,
  on(PickupLocationActions.AddLocation, (state, { payload }) => ({
    ...state,
    [payload.productCode]: payload.location,
  })),
  on(PickupLocationActions.RemoveLocation, (state, { payload }) => ({
    ...state,
    [payload]: { pickupOption: 'delivery' },
  }))
);
