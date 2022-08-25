import { createReducer, on } from '@ngrx/store';
import { PickupOptionActions } from '../../actions';
import { PickupOptionState } from '../../pickup-option-state';

export const initialState: PickupOptionState['pickupOption'] = {};

export const pickupOptionReducer = createReducer(
  initialState,
  on(
    PickupOptionActions.SetPickupOption,
    (state: PickupOptionState['pickupOption'], { payload }) => ({
      ...state,
      [payload.entryNumber]: payload.pickupOption,
    })
  )
);
