import { MemoizedSelector, createSelector } from '@ngrx/store';
import * as fromFeature from './../reducers';
import * as fromClientToken from './../reducers/client-token.reducer';

export const getClientTokenState: MemoizedSelector<
  any,
  fromClientToken.ClientTokenState
> = createSelector(
  fromFeature.getAuthState,
  (state: fromFeature.AuthState) => state.clientToken
);
