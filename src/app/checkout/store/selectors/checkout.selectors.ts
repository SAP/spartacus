import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromReducer from './../reducers/checkout.reducer';

export const getCheckoutStepsState = createSelector(
  fromFeature.getCheckoutState,
  (state: fromFeature.CheckoutState) => state.steps
);

export const getDeliveryAddress: MemoizedSelector<any, any> = createSelector(
  getCheckoutStepsState,
  fromReducer.getDeliveryAddress
);

export const getDeliveryModes: MemoizedSelector<any, any> = createSelector(
  getCheckoutStepsState,
  fromReducer.getDeliveryMode
);
