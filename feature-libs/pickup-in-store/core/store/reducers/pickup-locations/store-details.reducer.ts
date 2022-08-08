import { createReducer, on } from '@ngrx/store';
import { PickupLocationActions } from '../../actions';
import { PickupLocationsState } from '../../pickup-location-state';

export const storeDetailsInitialState: PickupLocationsState['storeDetails'] =
  {};
export const storeDetailsReducer = createReducer(
  storeDetailsInitialState,

  on(PickupLocationActions.SetStoreDetailsSuccess, (state, { payload }) => ({
    ...state,
    ...(payload?.name ? { [payload.name]: payload } : {}),
  }))
);
