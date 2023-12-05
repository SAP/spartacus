import { MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import { StateWithOrder } from '../order-state';
export declare const getConsignmentTrackingByIdEntities: MemoizedSelector<StateWithOrder, StateUtils.EntityLoaderState<ConsignmentTracking>>;
export declare const getConsignmentTrackingByIdEntity: (orderCode: string, consignmentCode: string) => MemoizedSelector<StateWithOrder, StateUtils.LoaderState<ConsignmentTracking>>;
export declare const getConsignmentTrackingById: (orderCode: string, consignmentCode: string) => MemoizedSelector<StateWithOrder, ConsignmentTracking>;
export declare const getConsignmentTrackingByIdLoading: (orderCode: string, consignmentCode: string) => MemoizedSelector<StateWithOrder, boolean>;
export declare const getConsignmentTrackingByIdSuccess: (orderCode: string, consignmentCode: string) => MemoizedSelector<StateWithOrder, boolean>;
