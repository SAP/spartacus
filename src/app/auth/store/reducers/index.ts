import {
  ActionReducerMap,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import * as fromUserToken from './user-token.reducer';

export interface TokensState {
  user: fromUserToken.UserTokenState;
}

export const reducers: ActionReducerMap<TokensState> = {
  user: fromUserToken.reducer
};

export const getTokensState: MemoizedSelector<any, any> = createFeatureSelector<
  TokensState
>('tokens');
