import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ORDER_TYPE } from '../../../model/replenishment-order.model';
import {
  CheckoutState,
  OrderTypesState,
  StateWithCheckout,
} from '../checkout-state';
import { getCheckoutState } from './checkout.selectors';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getSelectedOrderTypeSelector = (state: OrderTypesState) =>
  state.selected;

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getOrderTypesState: MemoizedSelector<
  StateWithCheckout,
  OrderTypesState
> = createSelector(getCheckoutState, (state: CheckoutState) => state.orderType);

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const getSelectedOrderType: MemoizedSelector<
  StateWithCheckout,
  ORDER_TYPE
> = createSelector(getOrderTypesState, getSelectedOrderTypeSelector);
