import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserState, StateWithUser } from '../user-state';
import { PaymentDetails } from '../../../occ/occ-models/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';

export const getPaymentMethodsState: MemoizedSelector<
  StateWithUser,
  LoaderState<PaymentDetails[]>
> = createSelector(
  getUserState,
  (state: UserState) => state.payments
);

export const getPaymentMethods: MemoizedSelector<
  StateWithUser,
  PaymentDetails[]
> = createSelector(
  getPaymentMethodsState,
  (state: LoaderState<PaymentDetails[]>) => loaderValueSelector(state)
);

export const getPaymentMethodsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getPaymentMethodsState,
  (state: LoaderState<PaymentDetails[]>) => loaderLoadingSelector(state)
);
