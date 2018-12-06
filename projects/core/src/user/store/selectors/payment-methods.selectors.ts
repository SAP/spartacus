import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUserPaymentMethodsReducer from '../reducers/payment-methods.reducer';
import { UserPaymentMethodsState, UserState } from '../user-state';
import { PaymentDetails } from '../../../occ-models/index';

export const getPaymentMethodsState: MemoizedSelector<
  any,
  UserPaymentMethodsState
> = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.payments
);

export const getPaymentMethods: MemoizedSelector<
  any,
  PaymentDetails[]
> = createSelector(
  getPaymentMethodsState,
  fromUserPaymentMethodsReducer.getPaymentMethods
);

export const getPaymentMethodsLoading: MemoizedSelector<
  any,
  boolean
> = createSelector(
  getPaymentMethodsState,
  fromUserPaymentMethodsReducer.getLoading
);
