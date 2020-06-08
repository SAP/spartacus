import {
  OrderApproval,
  OrderApprovalDecision,
} from '../../../model/order-approval.model';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { B2BSearchConfig } from '../../model/search-config';
import { serializeB2BSearchConfig } from '../../utils/serializer';
import {
  ORDER_APPROVAL_ENTITIES,
  ORDER_APPROVAL_LIST,
} from '../organization-state';
import { ListModel } from '../../../model/misc.model';

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

export const MAKE_DECISION = '[OrderApproval] Update OrderApproval';
export const MAKE_DECISION_FAIL = '[OrderApproval] Update OrderApproval Fail';
export const MAKE_DECISION_SUCCESS =
  '[OrderApproval] Update OrderApproval Success';

export class LoadOrderApproval extends EntityLoadAction {
  readonly type = LOAD_ORDER_APPROVAL;
  constructor(public payload: { userId: string; orderApprovalCode: string }) {
    super(ORDER_APPROVAL_ENTITIES, payload.orderApprovalCode);
  }
}

export class LoadOrderApprovalFail extends EntityFailAction {
  readonly type = LOAD_ORDER_APPROVAL_FAIL;
  constructor(public payload: { orderApprovalCode: string; error: any }) {
    super(ORDER_APPROVAL_ENTITIES, payload.orderApprovalCode, payload.error);
  }
}

export class LoadOrderApprovalSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORDER_APPROVAL_SUCCESS;
  constructor(public payload: OrderApproval[]) {
    super(
      ORDER_APPROVAL_ENTITIES,
      payload.map((orderApproval) => orderApproval.code)
    );
  }
}

export class LoadOrderApprovals extends EntityLoadAction {
  readonly type = LOAD_ORDER_APPROVALS;
  constructor(
    public payload: {
      userId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(ORDER_APPROVAL_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadOrderApprovalsFail extends EntityFailAction {
  readonly type = LOAD_ORDER_APPROVALS_FAIL;
  constructor(public payload: { params: B2BSearchConfig; error: any }) {
    super(
      ORDER_APPROVAL_LIST,
      serializeB2BSearchConfig(payload.params),
      payload.error
    );
  }
}

export class LoadOrderApprovalsSuccess extends EntitySuccessAction {
  readonly type = LOAD_ORDER_APPROVALS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(ORDER_APPROVAL_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class MakeDecision extends EntityLoadAction {
  readonly type = MAKE_DECISION;
  constructor(
    public payload: {
      userId: string;
      orderApprovalCode: string;
      orderApprovalDecision: OrderApprovalDecision;
    }
  ) {
    super(ORDER_APPROVAL_ENTITIES, payload.orderApprovalCode);
  }
}

export class MakeDecisionFail extends EntityFailAction {
  readonly type = MAKE_DECISION_FAIL;
  constructor(public payload: { orderApprovalCode: string; error: any }) {
    super(ORDER_APPROVAL_ENTITIES, payload.orderApprovalCode, payload.error);
  }
}

export class MakeDecisionSuccess extends EntitySuccessAction {
  readonly type = MAKE_DECISION_SUCCESS;
  constructor(public payload: OrderApprovalDecision) {
    super(ORDER_APPROVAL_ENTITIES, null, payload);
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
  | MakeDecisionSuccess;
