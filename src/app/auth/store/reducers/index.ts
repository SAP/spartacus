import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as fromUserToken from './user-token.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface UserState {
  token: fromUserToken.UserTokenState;
  // TODO user-details here
}

export const reducers: ActionReducerMap<UserState> = {
  token: fromUserToken.reducer
  // TODO user-details here
};

export const getUserState: MemoizedSelector<
  any,
  UserState
> = createFeatureSelector<UserState>('user');

function sessionStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['token'], // TODO [SPA-276] - 'user' doesn't work?
    rehydrate: true,
    storage: sessionStorage
  })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [
  sessionStorageSyncReducer
];
