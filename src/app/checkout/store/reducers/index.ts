import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromReducer from './delivery-countries.reducer';

export interface CheckoutState {
  deliveryCountries: fromReducer.DeliveryCountriesState;
}

export const reducers: ActionReducerMap<CheckoutState> = {
  deliveryCountries: fromReducer.reducer
};

export const getCheckoutState: MemoizedSelector<
  any,
  any
> = createFeatureSelector<CheckoutState>('checkout');
