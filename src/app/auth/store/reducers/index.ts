import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromUserToken from './user-token.reducer';

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
