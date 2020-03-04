import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateLoaderSelectors } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { OpenIdToken } from '../../models/kyma-token-types.model';
import { StateWithKyma } from '../kyma-state';
import { getKymaState } from './feature.selector';

export const getOpenIdTokenState: MemoizedSelector<
  StateWithKyma,
  LoaderState<OpenIdToken>
> = createSelector(getKymaState, state => state.openIdToken);

export const getOpenIdTokenValue: MemoizedSelector<
  StateWithKyma,
  OpenIdToken
> = createSelector(
  getOpenIdTokenState,
  StateLoaderSelectors.loaderValueSelector
);

export const getOpenIdTokenLoading: MemoizedSelector<
  StateWithKyma,
  boolean
> = createSelector(
  getOpenIdTokenState,
  StateLoaderSelectors.loaderLoadingSelector
);

export const getOpenIdTokenSuccess: MemoizedSelector<
  StateWithKyma,
  boolean
> = createSelector(
  getOpenIdTokenState,
  StateLoaderSelectors.loaderSuccessSelector
);

export const getOpenIdTokenError: MemoizedSelector<
  StateWithKyma,
  boolean
> = createSelector(
  getOpenIdTokenState,
  StateLoaderSelectors.loaderErrorSelector
);
