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

// TODO: In bug/SPA-1179 I have to comment it as
// it throws warning while builiding. At the moment we don't use it anywhere
// import { ClientAuthenticationToken } from '../../models/token-types.model';
// export const getClientToken: MemoizedSelector<
//   any,
//   ClientAuthenticationToken
// > = createSelector(getClientTokenState, fromClientToken.getClientToken);
