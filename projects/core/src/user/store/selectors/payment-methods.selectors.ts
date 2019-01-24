import { createSelector, MemoizedSelector } from '@ngrx/store';

import {
  UserPaymentMethodsState,
  UserState,
  StateWithUser
} from '../user-state';
import { PaymentDetails } from '../../../occ/occ-models/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';

export const getPaymentMethodsLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<UserPaymentMethodsState>
> = createSelector(
  getUserState,
  (state: UserState) => state.payments
);

export const getPaymentMethodsState: MemoizedSelector<
  StateWithUser,
  UserPaymentMethodsState
> = createSelector(
  getPaymentMethodsLoaderState,
  (state: LoaderState<UserPaymentMethodsState>) => loaderValueSelector(state)
);

export const getPaymentMethods: MemoizedSelector<
  StateWithUser,
  PaymentDetails[]
> = createSelector(
  getPaymentMethodsState,
  (state: UserPaymentMethodsState) => state.list
);

export const getPaymentMethodsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getPaymentMethodsLoaderState,
  (state: LoaderState<UserPaymentMethodsState>) => loaderLoadingSelector(state)
);
