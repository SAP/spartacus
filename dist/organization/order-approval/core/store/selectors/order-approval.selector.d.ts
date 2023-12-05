import { MemoizedSelector } from '@ngrx/store';
import { EntitiesModel, SearchConfig, StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../model/order-approval.model';
import { OrderApprovalManagement, OrderApprovalState } from '../order-approval-state';
export declare const getOrderApprovalState: MemoizedSelector<OrderApprovalState, OrderApprovalState>;
export declare const getOrderApprovalManagementState: MemoizedSelector<OrderApprovalState, OrderApprovalManagement>;
export declare const getOrderApprovalsState: MemoizedSelector<OrderApprovalState, StateUtils.EntityLoaderState<OrderApproval>>;
export declare const getOrderApproval: (orderApprovalCode: string) => MemoizedSelector<OrderApprovalState, StateUtils.LoaderState<OrderApproval>>;
export declare const getOrderApprovalList: (params: SearchConfig) => MemoizedSelector<OrderApprovalState, StateUtils.LoaderState<EntitiesModel<OrderApproval>>>;
