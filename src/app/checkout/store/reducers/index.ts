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
import * as fromCardTypes from './card-types.reducer';
import * as fromAddressVerification from './address-verification.reducer';

import * as fromAction from '../actions';

export interface CheckoutState {
  steps: fromCheckout.CheckoutState;
  countries: fromCountries.DeliveryCountriesState;
  titles: fromTitles.TitlesState;
  cardTypes: fromCardTypes.CardTypesState;
  addressVerificationResults: fromAddressVerification.AddressVerificationResultsState;
}

export const reducers: ActionReducerMap<CheckoutState> = {
  steps: fromCheckout.reducer,
  countries: fromCountries.reducer,
  titles: fromTitles.reducer,
  cardTypes: fromCardTypes.reducer,
  addressVerificationResults: fromAddressVerification.reducer
};

export const getCheckoutState: MemoizedSelector<
  any,
  CheckoutState
> = createFeatureSelector<CheckoutState>('checkout');

export function clearCheckoutState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === '[Site-context] Language Change') {
      action = new fromAction.ClearMiscsData();
    } else if (action.type === '[Site-context] Currency Change') {
      action = new fromAction.ClearSupportedDeliveryModes();
    } else if (action.type === '[Auth] Logout') {
      action = new fromAction.ClearCheckoutData();
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCheckoutState];
