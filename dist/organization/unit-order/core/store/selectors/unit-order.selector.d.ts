import { MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { StateWithUnitOrder } from '../unit-order-state';
export declare const getOrdersState: MemoizedSelector<StateWithUnitOrder, StateUtils.LoaderState<OrderHistoryList>>;
export declare const getOrdersLoaded: MemoizedSelector<StateWithUnitOrder, boolean>;
export declare const getOrders: MemoizedSelector<StateWithUnitOrder, OrderHistoryList>;
export declare const getOrderDetailState: MemoizedSelector<StateWithUnitOrder, StateUtils.LoaderState<Order>>;
export declare const getOrderDetails: MemoizedSelector<StateWithUnitOrder, Order>;
