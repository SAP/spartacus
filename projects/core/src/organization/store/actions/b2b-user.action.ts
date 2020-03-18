import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { B2BSearchConfig } from '../../model/search-config';
import { serializeB2BSearchConfig } from '../../utils/serializer';
import { B2B_USER_ENTITIES, USER_LIST } from '../organization-state';
import { ListModel } from '../../../model/misc.model';
import { B2BUser } from '../../../model/org-unit.model';

export const LOAD_B2B_USER = '[B2BUser] Load B2BUser Data';
export const LOAD_B2B_USER_FAIL = '[B2BUser] Load B2BUser Data Fail';
export const LOAD_B2B_USER_SUCCESS = '[B2BUser] Load B2BUser Data Success';

export const LOAD_B2B_USERS = '[B2BUser] Load B2BUsers';
export const LOAD_B2B_USERS_FAIL = '[B2BUser] Load B2BUsers Fail';
export const LOAD_B2B_USERS_SUCCESS = '[B2BUser] Load B2BUsers Success';

export class LoadB2BUser extends EntityLoadAction {
  readonly type = LOAD_B2B_USER;
  constructor(public payload: { userId: string; orgCustomerId: string }) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId);
  }
}

export class LoadB2BUserFail extends EntityFailAction {
  readonly type = LOAD_B2B_USER_FAIL;
  constructor(public payload: { orgCustomerId: string; error: any }) {
    super(B2B_USER_ENTITIES, payload.orgCustomerId, payload.error);
  }
}

export class LoadB2BUserSuccess extends EntitySuccessAction {
  readonly type = LOAD_B2B_USER_SUCCESS;
  constructor(public payload: B2BUser[]) {
    super(
      B2B_USER_ENTITIES,
      payload.map(orgUnitCustomer => orgUnitCustomer.uid)
    );
  }
}

export class LoadB2BUsers extends EntityLoadAction {
  readonly type = LOAD_B2B_USERS;
  constructor(
    public payload: {
      userId: string;
      params: B2BSearchConfig;
    }
  ) {
    super(USER_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export class LoadB2BUsersFail extends EntityFailAction {
  readonly type = LOAD_B2B_USERS_FAIL;
  constructor(public payload: { params: B2BSearchConfig; error: any }) {
    super(USER_LIST, serializeB2BSearchConfig(payload.params), payload.error);
  }
}

export class LoadB2BUsersSuccess extends EntitySuccessAction {
  readonly type = LOAD_B2B_USERS_SUCCESS;
  constructor(
    public payload: {
      page: ListModel;
      params: B2BSearchConfig;
    }
  ) {
    super(USER_LIST, serializeB2BSearchConfig(payload.params));
  }
}

export type B2BUserAction =
  | LoadB2BUser
  | LoadB2BUserFail
  | LoadB2BUserSuccess
  | LoadB2BUsers
  | LoadB2BUsersFail
  | LoadB2BUsersSuccess;
