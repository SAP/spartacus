import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as fromUserToken from './user-token.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export interface TokensState {
  user: fromUserToken.UserTokenState;
  // TODO: cart token here
}

export const reducers: ActionReducerMap<TokensState> = {
  user: fromUserToken.reducer
  // TODO: cart token here
};

export const getTokensState: MemoizedSelector<any, any> = createFeatureSelector<
  TokensState
>('tokens');

function sessionStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['user'],
    rehydrate: true,
    storage: sessionStorage
  })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [
  sessionStorageSyncReducer
];
