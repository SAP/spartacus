import { StateUtils } from '@spartacus/core';
import { OrderApproval } from '../model/order-approval.model';
export declare const ORDER_APPROVAL_FEATURE = "order-approval";
export declare const ORDER_APPROVAL_ENTITIES = "order-approval-entities";
export declare const ORDER_APPROVAL_LIST = "order-approval-list";
export declare const ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID = "orderApproval.makeDecision";
export interface OrderApprovalManagement extends StateUtils.EntityListState<OrderApproval> {
}
export interface OrderApprovalState {
    [ORDER_APPROVAL_FEATURE]: OrderApprovalManagement;
}
