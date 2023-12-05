import { ListModel, StateUtils } from '@spartacus/core';
import { OrderApproval } from '../../model/order-approval.model';
export declare const orderApprovalInitialState: OrderApproval | undefined;
export declare const orderApprovalsInitialState: ListModel | undefined;
export declare function orderApprovalsEntitiesReducer(state: OrderApproval | undefined, action: StateUtils.LoaderAction): OrderApproval | undefined;
export declare function orderApprovalsListReducer(state: ListModel | undefined, action: StateUtils.LoaderAction): ListModel | undefined;
