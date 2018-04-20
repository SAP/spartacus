import {
  ActionReducerMap,
  MemoizedSelector,
  MetaReducer,
  ActionReducer,
  createFeatureSelector
} from '@ngrx/store';

import * as fromUserDetailsReducer from './user-details.reducer';
import * as fromUserToken from './user-token.reducer';
import * as fromUserAddresses from './user-addresses.reducer';
import * as fromPaymentMethods from './user-payment-methods.reducer';

export interface UserState {
  account: fromUserDetailsReducer.UserDetailsState;
  auth: fromUserToken.UserTokenState;
  existingAddresses: fromUserAddresses.UserAddressesState;
  existingPaymentMethods: fromPaymentMethods.UserPaymentMethodsState;
}

export const reducers: ActionReducerMap<UserState> = {
  account: fromUserDetailsReducer.reducer,
  auth: fromUserToken.reducer,
  existingAddresses: fromUserAddresses.reducer,
  existingPaymentMethods: fromPaymentMethods.reducer
};

export const getUserState: MemoizedSelector<
  any,
  UserState
> = createFeatureSelector<UserState>('user');

export function clearUserState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === '[User] Logout') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearUserState];
