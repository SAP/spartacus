import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromUserPaymentMethodsReducer from '../reducers/payment-methods.reducer';
import {
  UserPaymentMethodsState,
  UserState,
  StateWithUser
} from '../user-state';
import { PaymentDetails } from '../../../occ/occ-models/index';
import { getUserState } from './feature.selector';

export const getPaymentMethodsState: MemoizedSelector<
  StateWithUser,
  UserPaymentMethodsState
> = createSelector(
  getUserState,
  (state: UserState) => state.payments
);

export const getPaymentMethods: MemoizedSelector<
  StateWithUser,
  PaymentDetails[]
> = createSelector(
  getPaymentMethodsState,
  fromUserPaymentMethodsReducer.getPaymentMethods
);

export const getPaymentMethodsLoading: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getPaymentMethodsState,
  fromUserPaymentMethodsReducer.getLoading
);
