import { ListModel, SearchConfig, StateUtils } from '@spartacus/core';
import { OrderApproval, OrderApprovalDecision } from '../../model/order-approval.model';
export declare const LOAD_ORDER_APPROVAL = "[OrderApproval] Load OrderApproval Data";
export declare const LOAD_ORDER_APPROVAL_FAIL = "[OrderApproval] Load OrderApproval Data Fail";
export declare const LOAD_ORDER_APPROVAL_SUCCESS = "[OrderApproval] Load OrderApproval Data Success";
export declare const LOAD_ORDER_APPROVALS = "[OrderApproval] Load OrderApprovals";
export declare const LOAD_ORDER_APPROVALS_FAIL = "[OrderApproval] Load OrderApprovals Fail";
export declare const LOAD_ORDER_APPROVALS_SUCCESS = "[OrderApproval] Load OrderApprovals Success";
export declare const MAKE_DECISION = "[OrderApproval] Make OrderApproval Decision";
export declare const MAKE_DECISION_FAIL = "[OrderApproval] Make OrderApproval Decision Fail";
export declare const MAKE_DECISION_SUCCESS = "[OrderApproval] Make OrderApproval Decision Success";
export declare const MAKE_DECISION_RESET = "[OrderApproval] Make OrderApproval Decision Reset";
export declare class LoadOrderApproval extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orderApprovalCode: string;
    };
    readonly type = "[OrderApproval] Load OrderApproval Data";
    constructor(payload: {
        userId: string;
        orderApprovalCode: string;
    });
}
export declare class LoadOrderApprovalFail extends StateUtils.EntityFailAction {
    payload: {
        orderApprovalCode: string;
        error: any;
    };
    readonly type = "[OrderApproval] Load OrderApproval Data Fail";
    constructor(payload: {
        orderApprovalCode: string;
        error: any;
    });
}
export declare class LoadOrderApprovalSuccess extends StateUtils.EntitySuccessAction {
    payload: OrderApproval | OrderApproval[];
    readonly type = "[OrderApproval] Load OrderApproval Data Success";
    constructor(payload: OrderApproval | OrderApproval[]);
}
export declare class LoadOrderApprovals extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        params: SearchConfig;
    };
    readonly type = "[OrderApproval] Load OrderApprovals";
    constructor(payload: {
        userId: string;
        params: SearchConfig;
    });
}
export declare class LoadOrderApprovalsFail extends StateUtils.EntityFailAction {
    payload: {
        params: SearchConfig;
        error: any;
    };
    readonly type = "[OrderApproval] Load OrderApprovals Fail";
    constructor(payload: {
        params: SearchConfig;
        error: any;
    });
}
export declare class LoadOrderApprovalsSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        page: ListModel;
        params: SearchConfig;
    };
    readonly type = "[OrderApproval] Load OrderApprovals Success";
    constructor(payload: {
        page: ListModel;
        params: SearchConfig;
    });
}
export declare class MakeDecision extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orderApprovalCode: string;
        orderApprovalDecision: OrderApprovalDecision;
    };
    readonly type = "[OrderApproval] Make OrderApproval Decision";
    constructor(payload: {
        userId: string;
        orderApprovalCode: string;
        orderApprovalDecision: OrderApprovalDecision;
    });
}
export declare class MakeDecisionFail extends StateUtils.EntityFailAction {
    payload: {
        orderApprovalCode: string;
        error: any;
    };
    readonly type = "[OrderApproval] Make OrderApproval Decision Fail";
    constructor(payload: {
        orderApprovalCode: string;
        error: any;
    });
}
export declare class MakeDecisionSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        orderApprovalCode: string;
        orderApprovalDecision: OrderApprovalDecision;
    };
    readonly type = "[OrderApproval] Make OrderApproval Decision Success";
    constructor(payload: {
        orderApprovalCode: string;
        orderApprovalDecision: OrderApprovalDecision;
    });
}
export declare class MakeDecisionReset extends StateUtils.EntityLoaderResetAction {
    readonly type = "[OrderApproval] Make OrderApproval Decision Reset";
    constructor();
}
export type OrderApprovalAction = LoadOrderApproval | LoadOrderApprovalFail | LoadOrderApprovalSuccess | LoadOrderApprovals | LoadOrderApprovalsFail | LoadOrderApprovalsSuccess | MakeDecision | MakeDecisionFail | MakeDecisionSuccess | MakeDecisionReset;
