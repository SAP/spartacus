import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import { UserToken } from '../../models/token-types.model';

export const getUserToken: MemoizedSelector<any, UserToken> = createSelector(
  fromFeature.getTokensState,
  (state: fromFeature.TokensState) => state.user.token
);
