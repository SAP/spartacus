import { MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { StateWithOrder } from '../order-state';
export declare const getOrderByIdEntities: MemoizedSelector<StateWithOrder, StateUtils.EntityLoaderState<Order>>;
export declare const getOrderByIdEntity: (code: string) => MemoizedSelector<StateWithOrder, StateUtils.LoaderState<Order>>;
export declare const getOrderById: (code: string) => MemoizedSelector<StateWithOrder, Order>;
export declare const getOrderByIdLoading: (code: string) => MemoizedSelector<StateWithOrder, boolean>;
export declare const getOrderByIdSuccess: (code: string) => MemoizedSelector<StateWithOrder, boolean>;
