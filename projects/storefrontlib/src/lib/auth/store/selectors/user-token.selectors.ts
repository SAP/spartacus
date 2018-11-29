import { MemoizedSelector, createSelector } from '@ngrx/store';

import * as fromFeature from './../reducers';
import * as fromUserToken from './../reducers/user-token.reducer';
import { UserTokenState } from '../reducers/user-token.reducer';
import { UserToken } from '../../models/token-types.model';

export const getUserTokenState: MemoizedSelector<
  any,
  UserTokenState
> = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.userToken
);

export const getUserToken: MemoizedSelector<any, UserToken> = createSelector(
  getUserTokenState,
  fromUserToken.getUserToken
);
