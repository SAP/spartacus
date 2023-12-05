import { MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { StateWithOrder } from '../order-state';
export declare const getOrdersState: MemoizedSelector<StateWithOrder, StateUtils.LoaderState<OrderHistoryList>>;
export declare const getOrdersLoaded: MemoizedSelector<StateWithOrder, boolean>;
export declare const getOrders: MemoizedSelector<StateWithOrder, OrderHistoryList>;
