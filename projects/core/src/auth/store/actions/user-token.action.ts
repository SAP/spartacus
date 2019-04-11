import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityResetAction,
  EntitySuccessAction,
} from '../../../state/utils/entity-loader/entity-loader.action';
import { UserToken } from '../../models/token-types.model';
import { AUTH_USER } from '../auth-state';

export const LOAD_USER_TOKEN = '[Auth] Load User Token';
export const LOAD_USER_TOKEN_FAIL = '[Auth] Load User Token Fail';
export const LOAD_USER_TOKEN_SUCCESS = '[Auth] Load User Token Success';
export const RESET_USER_TOKEN_LOADER = '[Auth] Reset User Token';
export const REFRESH_USER_TOKEN = '[Auth] Refresh User Token';
export const REFRESH_USER_TOKEN_FAIL = '[Auth] Refresh User Token Fail';
export const REFRESH_USER_TOKEN_SUCCESS = '[Auth] Refresh User Token Success';

export class LoadUserToken extends EntityLoadAction {
  readonly type = LOAD_USER_TOKEN;
  constructor(public payload: { userId: string; password: string }) {
    super(PROCESS_FEATURE, AUTH_USER);
  }
}

export class LoadUserTokenFail extends EntityFailAction {
  readonly type = LOAD_USER_TOKEN_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, AUTH_USER);
  }
}

export class LoadUserTokenSuccess extends EntitySuccessAction {
  readonly type = LOAD_USER_TOKEN_SUCCESS;
  constructor(public payload: UserToken) {
    super(PROCESS_FEATURE, AUTH_USER);
  }
}

export class ResetUserTokenLoader extends EntityResetAction {
  readonly type = RESET_USER_TOKEN_LOADER;
  constructor() {
    super(PROCESS_FEATURE, AUTH_USER);
  }
}

export class RefreshUserToken extends EntityLoadAction {
  readonly type = REFRESH_USER_TOKEN;
  constructor(public payload: { userId: string; refreshToken: string }) {
    super(PROCESS_FEATURE, AUTH_USER);
  }
}

export class RefreshUserTokenSuccess extends EntitySuccessAction {
  readonly type = REFRESH_USER_TOKEN_SUCCESS;
  constructor(public payload: UserToken) {
    super(PROCESS_FEATURE, AUTH_USER);
  }
}

export class RefreshUserTokenFail extends EntityFailAction {
  readonly type = REFRESH_USER_TOKEN_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, AUTH_USER);
  }
}

// action types
export type UserTokenAction =
  | LoadUserToken
  | LoadUserTokenFail
  | LoadUserTokenSuccess
  | ResetUserTokenLoader
  | RefreshUserToken
  | RefreshUserTokenFail
  | RefreshUserTokenSuccess;
