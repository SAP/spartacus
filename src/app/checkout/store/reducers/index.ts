import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  MemoizedSelector
} from '@ngrx/store';
import * as fromCheckout from './checkout.reducer';
import * as fromCountries from './delivery-countries.reducer';
import * as fromTitles from './titles.reducer';

export interface CheckoutState {
  steps: fromCheckout.CheckoutState;
  countries: fromCountries.DeliveryCountriesState;
  titles: fromTitles.TitlesState;
}

export const reducers: ActionReducerMap<CheckoutState> = {
  steps: fromCheckout.reducer,
  countries: fromCountries.reducer,
  titles: fromTitles.reducer
};

export const getCheckoutState: MemoizedSelector<
  any,
  CheckoutState
> = createFeatureSelector<CheckoutState>('checkout');

export function clearCheckoutState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === '[Auth] Logout') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCheckoutState];
