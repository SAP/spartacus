import { createReducer, on } from '@ngrx/store';
import { PickupLocationActions } from '../../actions';
import { PickupLocationsState } from '../../pickup-location-state';

export const storeDetailsIntialState: PickupLocationsState['storeDetails'] = {};
export const storeDetailsReducer = createReducer(
  storeDetailsIntialState,

  on(PickupLocationActions.SetStoreDetailsSuccess, (state, { payload }) => ({
    ...state,
    ...(payload?.name ? { [payload.name]: payload } : {}),
  }))
);
