import { createSelector, MemoizedSelector } from '@ngrx/store';
import { PaymentDetails } from '../../../model/cart.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getPaymentMethodsState: MemoizedSelector<
  StateWithUser,
  LoaderState<PaymentDetails[]>
> = createSelector(getUserState, (state: UserState) => state.payments);

export const getPaymentMethods: MemoizedSelector<
  StateWithUser,
  PaymentDetails[]
> = createSelector(
  getPaymentMethodsState,
  (state: LoaderState<PaymentDetails[]>) =>
    StateUtils.loaderValueSelector(state)
);

export const getPaymentMethodsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getPaymentMethodsState,
  (state: LoaderState<PaymentDetails[]>) =>
    StateUtils.loaderLoadingSelector(state)
);

export const getPaymentMethodsLoadedSuccess: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getPaymentMethodsState,
  (state: LoaderState<PaymentDetails[]>) =>
    StateUtils.loaderSuccessSelector(state) &&
    !StateUtils.loaderLoadingSelector(state)
);
