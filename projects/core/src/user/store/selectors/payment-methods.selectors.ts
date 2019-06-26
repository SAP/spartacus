import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PaymentDetails } from '../../../model/cart.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderLoadingSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { StateWithUser, UserState } from '../user-state';
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
