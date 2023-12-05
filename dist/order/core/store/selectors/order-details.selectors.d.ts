import { MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { StateWithOrder } from '../order-state';
export declare const getOrderDetailState: MemoizedSelector<StateWithOrder, StateUtils.LoaderState<Order>>;
export declare const getOrderDetails: MemoizedSelector<StateWithOrder, Order>;
export declare const getOrderDetailsLoading: MemoizedSelector<StateWithOrder, boolean>;
