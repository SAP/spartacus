import { createSelector, MemoizedSelector } from '@ngrx/store';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderErrorSelector,
  loaderLoadingSelector,
  loaderSuccessSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { OpenIdToken } from '../../models/kyma-token-types.model';
import { StateWithKyma } from '../kyma-state';
import { getKymaState } from './feature.selector';

export const getOpenIdTokenState: MemoizedSelector<
  StateWithKyma,
  LoaderState<OpenIdToken>
> = createSelector(
  getKymaState,
  state => state.openIdToken
);

export const getOpenIdTokenValue: MemoizedSelector<
  StateWithKyma,
  OpenIdToken
> = createSelector(
  getOpenIdTokenState,
  loaderValueSelector
);

export const getOpenIdTokenLoading: MemoizedSelector<
  StateWithKyma,
  boolean
> = createSelector(
  getOpenIdTokenState,
  loaderLoadingSelector
);

export const getOpenIdTokenSuccess: MemoizedSelector<
  StateWithKyma,
  boolean
> = createSelector(
  getOpenIdTokenState,
  loaderSuccessSelector
);

export const getOpenIdTokenError: MemoizedSelector<
  StateWithKyma,
  boolean
> = createSelector(
  getOpenIdTokenState,
  loaderErrorSelector
);
