import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ORDER_TYPE } from '@spartacus/core';
import {
  CheckoutState,
  OrderTypesState,
  StateWithCheckout,
} from '../checkout-state';
import { getCheckoutState } from './checkout.selectors';

export const getSelectedOrderTypeSelector = (state: OrderTypesState) =>
  state.selected;

export const getOrderTypesState: MemoizedSelector<
  StateWithCheckout,
  OrderTypesState
> = createSelector(getCheckoutState, (state: CheckoutState) => state.orderType);

export const getSelectedOrderType: MemoizedSelector<
  StateWithCheckout,
  ORDER_TYPE
> = createSelector(getOrderTypesState, getSelectedOrderTypeSelector);
