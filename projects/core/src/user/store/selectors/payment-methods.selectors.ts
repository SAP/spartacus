import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserState, StateWithUser } from '../user-state';
import { PaymentDetails } from '../../../occ/occ-models/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';

export const getPaymentMethodsLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<PaymentDetails[]>
> = createSelector(
  getUserState,
  (state: UserState) => state.payments
);

export const getPaymentMethodsState: MemoizedSelector<
  StateWithUser,
  PaymentDetails[]
> = createSelector(
  getPaymentMethodsLoaderState,
  (state: LoaderState<PaymentDetails[]>) => loaderValueSelector(state)
);

export const getPaymentMethods: MemoizedSelector<
  StateWithUser,
  PaymentDetails[]
> = createSelector(
  getPaymentMethodsState,
  (state: PaymentDetails[]) => state
);

export const getPaymentMethodsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getPaymentMethodsLoaderState,
  (state: LoaderState<PaymentDetails[]>) => loaderLoadingSelector(state)
);
