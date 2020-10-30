import {
  ListModel,
  PROCESS_FEATURE,
  SearchConfig,
  StateUtils,
} from '@spartacus/core';
import {
  OrderApproval,
  OrderApprovalDecision,
} from '../../model/order-approval.model';
import {
  ORDER_APPROVAL_ENTITIES,
  ORDER_APPROVAL_LIST,
  ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID,
} from '../order-approval-state';

export const LOAD_ORDER_APPROVAL = '[OrderApproval] Load OrderApproval Data';
export const LOAD_ORDER_APPROVAL_FAIL =
  '[OrderApproval] Load OrderApproval Data Fail';
export const LOAD_ORDER_APPROVAL_SUCCESS =
  '[OrderApproval] Load OrderApproval Data Success';

export const LOAD_ORDER_APPROVALS = '[OrderApproval] Load OrderApprovals';
export const LOAD_ORDER_APPROVALS_FAIL =
  '[OrderApproval] Load OrderApprovals Fail';
export const LOAD_ORDER_APPROVALS_SUCCESS =
  '[OrderApproval] Load OrderApprovals Success';

export const MAKE_DECISION = '[OrderApproval] Make OrderApproval Decision';
export const MAKE_DECISION_FAIL =
  '[OrderApproval] Make OrderApproval Decision Fail';
export const MAKE_DECISION_SUCCESS =
  '[OrderApproval] Make OrderApproval Decision Success';
export const MAKE_DECISION_RESET =
  '[OrderApproval] Make OrderApproval Decision Reset';

export class LoadOrderApproval extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ORDER_APPROVAL;
  constructor(public payload: { userId: string; orderApprovalCode: string }) {
    super(ORDER_APPROVAL_ENTITIES, payload.orderApprovalCode);
  }
}

export class LoadOrderApprovalFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ORDER_APPROVAL_FAIL;
  constructor(public payload: { orderApprovalCode: string; error: any }) {
    super(ORDER_APPROVAL_ENTITIES, payload.orderApprovalCode, payload.error);
  }
}

export class LoadOrderApprovalSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ORDER_APPROVAL_SUCCESS;
  constructor(public payload: OrderApproval | OrderApproval[]) {
    super(
      ORDER_APPROVAL_ENTITIES,
      Array.isArray(payload)
        ? payload.map((orderApproval) => orderApproval?.code)
        : payload?.code
    );
  }
}

export class LoadOrderApprovals extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ORDER_APPROVALS;
  constructor(
    public payload: {
      userId: string;
      params: SearchConfig;
    }
  ) {
    super(
      ORDER_APPROVAL_LIST,
      StateUtils.serializeSearchConfig(payload.params)
    );
  }
}

export class LoadOrderApprovalsFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ORDER_APPROVALS_FAIL;
  constructor(public payload: { params: SearchConfig; error: any }) {
    super(
      ORDER_APPROVAL_LIST,
      StateUtils.serializeSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadOrderApprovalsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ORDER_APPROVALS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: SearchConfig;
    }
  ) {
    super(
      ORDER_APPROVAL_LIST,
      StateUtils.serializeSearchConfig(payload.params)
    );
  }
}

export class MakeDecision extends StateUtils.EntityLoadAction {
  readonly type = MAKE_DECISION;
  constructor(
    public payload: {
      userId: string;
      orderApprovalCode: string;
      orderApprovalDecision: OrderApprovalDecision;
    }
  ) {
    super(PROCESS_FEATURE, ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID);
  }
}

export class MakeDecisionFail extends StateUtils.EntityFailAction {
  readonly type = MAKE_DECISION_FAIL;
  constructor(public payload: { orderApprovalCode: string; error: any }) {
    super(PROCESS_FEATURE, ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID, payload);
  }
}

export class MakeDecisionSuccess extends StateUtils.EntitySuccessAction {
  readonly type = MAKE_DECISION_SUCCESS;
  constructor(
    public payload: {
      orderApprovalCode: string;
      orderApprovalDecision: OrderApprovalDecision;
    }
  ) {
    super(PROCESS_FEATURE, ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID);
  }
}

export class MakeDecisionReset extends StateUtils.EntityLoaderResetAction {
  readonly type = MAKE_DECISION_RESET;
  constructor() {
    super(PROCESS_FEATURE, ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID);
  }
}

export type OrderApprovalAction =
  | LoadOrderApproval
  | LoadOrderApprovalFail
  | LoadOrderApprovalSuccess
  | LoadOrderApprovals
  | LoadOrderApprovalsFail
  | LoadOrderApprovalsSuccess
  | MakeDecision
  | MakeDecisionFail
  | MakeDecisionSuccess
  | MakeDecisionReset;
