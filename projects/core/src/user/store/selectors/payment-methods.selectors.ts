import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PaymentDetails } from '../../../model/cart.model';
import { StateLoaderSelectors } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
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
  (state: LoaderState<PaymentDetails[]>) =>
    StateLoaderSelectors.loaderValueSelector(state)
);

export const getPaymentMethodsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getPaymentMethodsState,
  (state: LoaderState<PaymentDetails[]>) =>
    StateLoaderSelectors.loaderLoadingSelector(state)
);

export const getPaymentMethodsLoadedSuccess: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getPaymentMethodsState,
  (state: LoaderState<PaymentDetails[]>) =>
    StateLoaderSelectors.loaderSuccessSelector(state) &&
    !StateLoaderSelectors.loaderLoadingSelector(state)
);
