import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromReducer from '../reducers/delivery-modes.reducer';

export const getDeliveryModesState: MemoizedSelector<any, any> = createSelector(
  fromFeature.getCheckoutState,
  (state: fromFeature.CheckoutState) => state.modes
);

export const getDeliveryModesEntities: MemoizedSelector<
  any,
  any
> = createSelector(getDeliveryModesState, fromReducer.getDeliveryModesEntites);

export const getAllDeliveryModes: MemoizedSelector<any, any> = createSelector(
  getDeliveryModesState,
  entites => {
    return Object.keys(entites).map(code => entites[code]);
  }
);
