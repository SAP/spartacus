import { createSelector, MemoizedSelector } from '@ngrx/store';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderErrorSelector,
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { OpenIdToken } from '../../models/token-types.model';
import { StateWithAuth } from '../auth-state';
import { getAuthState } from './feature.selector';

export const getOpenIdTokenState: MemoizedSelector<
  StateWithAuth,
  LoaderState<OpenIdToken>
> = createSelector(
  getAuthState,
  state => state.openIdToken
);

export const getOpenIdTokenValue: MemoizedSelector<
  StateWithAuth,
  OpenIdToken
> = createSelector(
  getOpenIdTokenState,
  loaderValueSelector
);

export const getOpenIdTokenLoading: MemoizedSelector<
  StateWithAuth,
  boolean
> = createSelector(
  getOpenIdTokenState,
  loaderLoadingSelector
);

export const getOpenIdTokenSuccess: MemoizedSelector<
  StateWithAuth,
  boolean
> = createSelector(
  getOpenIdTokenState,
  loaderSuccessSelector
);

export const getOpenIdTokenError: MemoizedSelector<
  StateWithAuth,
  boolean
> = createSelector(
  getOpenIdTokenState,
  loaderErrorSelector
);
